#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function parseArgs(argv) {
    const args = [...argv]
    let input = 'loadtest1.js'
    let output = 'loadtest.js'

    for (let i = 0; i < args.length; i += 1) {
        const token = args[i]
        if (token === '-i' || token === '--input') {
            input = args[i + 1]
            i += 1
        } else if (token === '-o' || token === '--output') {
            output = args[i + 1]
            i += 1
        }
    }

    return { input, output }
}

function findMatchingParen(text, startIndex) {
    let depth = 0
    let inString = false
    let quote = ''
    let escaped = false

    for (let i = startIndex; i < text.length; i += 1) {
        const ch = text[i]

        if (inString) {
            if (escaped) {
                escaped = false
            } else if (ch === '\\') {
                escaped = true
            } else if (ch === quote) {
                inString = false
            }
            continue
        }

        if (ch === '"' || ch === "'" || ch === '`') {
            inString = true
            quote = ch
            continue
        }

        if (ch === '(') {
            depth += 1
        } else if (ch === ')') {
            depth -= 1
            if (depth === 0) {
                return i
            }
        }
    }

    return -1
}

function splitTopLevelArgs(argText) {
    const parts = []
    let depthParen = 0
    let depthBrace = 0
    let depthBracket = 0
    let inString = false
    let quote = ''
    let escaped = false
    let start = 0

    for (let i = 0; i < argText.length; i += 1) {
        const ch = argText[i]

        if (inString) {
            if (escaped) {
                escaped = false
            } else if (ch === '\\') {
                escaped = true
            } else if (ch === quote) {
                inString = false
            }
            continue
        }

        if (ch === '"' || ch === "'" || ch === '`') {
            inString = true
            quote = ch
            continue
        }

        if (ch === '(') depthParen += 1
        if (ch === ')') depthParen -= 1
        if (ch === '{') depthBrace += 1
        if (ch === '}') depthBrace -= 1
        if (ch === '[') depthBracket += 1
        if (ch === ']') depthBracket -= 1

        if (ch === ',' && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
            parts.push(argText.slice(start, i).trim())
            start = i + 1
        }
    }

    const last = argText.slice(start).trim()
    if (last) {
        parts.push(last)
    }

    return parts
}

function parseRequests(scriptText) {
    const requests = []
    const callRegex = /http\.(get|post|put|patch|del|delete)\s*\(/g
    let match

    while ((match = callRegex.exec(scriptText)) !== null) {
        const methodRaw = match[1].toLowerCase()
        const method = methodRaw === 'del' ? 'delete' : methodRaw
        const openParenIndex = callRegex.lastIndex - 1
        const closeParenIndex = findMatchingParen(scriptText, openParenIndex)
        if (closeParenIndex === -1) {
            continue
        }

        const argText = scriptText.slice(openParenIndex + 1, closeParenIndex)
        const args = splitTopLevelArgs(argText)

        if (args.length === 0) {
            continue
        }

        const first = args[0]
        const urlMatch = first.match(/^['"]([^'"]+)['"]$/)
        if (!urlMatch) {
            continue
        }

        const url = urlMatch[1]
        let body = null
        if (['post', 'put', 'patch'].includes(method) && args[1]) {
            body = args[1]
        }

        requests.push({ method, url, body })
        callRegex.lastIndex = closeParenIndex + 1
    }

    return requests
}

function isLikelyStaticAsset(urlObj) {
    const p = urlObj.pathname.toLowerCase()
    return /(\.css|\.js|\.png|\.jpg|\.jpeg|\.svg|\.webp|\.woff2?|\.ttf|\.ico)$/.test(p)
}

function inferPrimaryOrigin(urls) {
    const counter = new Map()

    for (const raw of urls) {
        try {
            const u = new URL(raw)
            const origin = u.origin
            counter.set(origin, (counter.get(origin) || 0) + 1)
        } catch (err) {
            // Skip malformed URLs.
        }
    }

    let best = null
    let bestCount = -1
    for (const [origin, count] of counter.entries()) {
        if (count > bestCount) {
            best = origin
            bestCount = count
        }
    }

    return best
}

function tryReadSigninDefaults(requests) {
    const signin = requests.find((r) => r.method === 'post' && /\/signin\b/.test(r.url))
    if (!signin || !signin.body) {
        return { userName: 'demouser', password: 'testingisfun99' }
    }

    const quoted = signin.body.match(/^['"]([\s\S]*)['"]$/)
    if (!quoted) {
        return { userName: 'demouser', password: 'testingisfun99' }
    }

    try {
        const json = JSON.parse(quoted[1])
        return {
            userName: typeof json.userName === 'string' && json.userName ? json.userName : 'demouser',
            password: typeof json.password === 'string' && json.password ? json.password : 'testingisfun99',
        }
    } catch (err) {
        return { userName: 'demouser', password: 'testingisfun99' }
    }
}

function uniqueByMethodUrl(requests) {
    const seen = new Set()
    const out = []

    for (const r of requests) {
        const key = `${r.method} ${r.url}`
        if (seen.has(key)) {
            continue
        }
        seen.add(key)
        out.push(r)
    }

    return out
}

function requestKey(method, url) {
    return `${method.toLowerCase()} ${url}`
}

function requestPathKey(method, pathWithQuery) {
    return `${method.toLowerCase()} ${pathWithQuery}`
}

function buildThinkTimeMapFromHar(harPath, primaryOrigin) {
    if (!harPath || !fs.existsSync(harPath)) {
        return { byUrlKey: new Map(), byPathKey: new Map() }
    }

    let parsed
    try {
        parsed = JSON.parse(fs.readFileSync(harPath, 'utf8'))
    } catch (err) {
        return { byUrlKey: new Map(), byPathKey: new Map() }
    }

    const entries = Array.isArray(parsed?.log?.entries) ? parsed.log.entries : []
    const flow = []

    for (const entry of entries) {
        try {
            const method = String(entry?.request?.method || '').toLowerCase()
            const url = String(entry?.request?.url || '')
            if (!method || !url) {
                continue
            }

            if (!['get', 'post', 'put', 'patch', 'delete', 'del'].includes(method)) {
                continue
            }

            const normalizedMethod = method === 'del' ? 'delete' : method
            const u = new URL(url)
            if (u.origin !== primaryOrigin) {
                continue
            }

            const path = toRelativeWithQuery(u)
            if (isLikelyStaticAsset(u)) {
                continue
            }
            if (/\/failed-request\b/.test(path)) {
                continue
            }

            const started = Date.parse(entry.startedDateTime)
            if (!Number.isFinite(started)) {
                continue
            }

            const durationMs = typeof entry.time === 'number' && entry.time > 0 ? entry.time : 0
            const ended = started + durationMs

            flow.push({
                method: normalizedMethod,
                url,
                path,
                started,
                ended,
            })
        } catch (err) {
            // Skip malformed entries.
        }
    }

    if (flow.length === 0) {
        return { byUrlKey: new Map(), byPathKey: new Map() }
    }

    flow.sort((a, b) => a.started - b.started)

    const seen = new Set()
    const uniqueFlow = []
    for (const req of flow) {
        const key = requestKey(req.method, req.url)
        if (seen.has(key)) {
            continue
        }
        seen.add(key)
        uniqueFlow.push(req)
    }

    const byUrlKey = new Map()
    const byPathKey = new Map()
    for (let i = 0; i < uniqueFlow.length; i += 1) {
        const current = uniqueFlow[i]
        const next = uniqueFlow[i + 1]
        const gapMs = next ? Math.max(0, next.started - current.ended) : 0
        const thinkTimeSec = gapMs / 1000

        byUrlKey.set(requestKey(current.method, current.url), thinkTimeSec)
        byPathKey.set(requestPathKey(current.method, current.path), thinkTimeSec)
    }

    return { byUrlKey, byPathKey }
}

function toRelativeWithQuery(urlObj) {
    const pathWithQuery = `${urlObj.pathname}${urlObj.search || ''}`
    return pathWithQuery || '/'
}

function sanitizeName(text) {
    return text
        .replace(/[^a-zA-Z0-9_]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toLowerCase() || 'request'
}

function escapeTemplateLiteral(text) {
    return text.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function formatSleepSeconds(seconds) {
    return Number(seconds || 0).toFixed(3)
}

function buildOutput({ baseOrigin, requests, signinDefaults }) {
    const lines = []

    lines.push("import http from 'k6/http'")
    lines.push("import { SharedArray } from 'k6/data'")
    lines.push("import { check, group, sleep } from 'k6'")
    lines.push('import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"')
    lines.push('import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"')
    lines.push('')
    lines.push(`const BASE_URL = __ENV.BASE_URL || '${baseOrigin}'`)
    lines.push(`const USERNAME = __ENV.USERNAME || '${signinDefaults.userName}'`)
    lines.push(`const PASSWORD = __ENV.PASSWORD || '${signinDefaults.password}'`)
    lines.push("const DO_SIGNIN = (__ENV.DO_SIGNIN || 'true').toLowerCase() === 'true'")
    lines.push("const VUS = parseInt(__ENV.VUS || '10', 10)")
    lines.push("const DURATION = __ENV.DURATION || '30s'")
    lines.push("const RAMP_UP = __ENV.RAMP_UP || '10s'")
    lines.push("const RAMP_DOWN = __ENV.RAMP_DOWN || '5s'")
    lines.push('')
    lines.push("const USERS = new SharedArray('users', () => {")
    lines.push("  const rows = open('../testData/users.csv').trim().split(/\\r?\\n/)")
    lines.push('  return rows.slice(1)')
    lines.push('    .map((line) => line.trim())')
    lines.push('    .filter(Boolean)')
    lines.push("    .map((line) => {")
    lines.push("      const [userName, password] = line.split(',').map((value) => value.trim())")
    lines.push('      return { userName, password }')
    lines.push('    })')
    lines.push("    .filter((user) => user.userName && user.password)")
    lines.push('})')
    lines.push('')
    lines.push('export const options = {')
    lines.push('  scenarios: {')
    lines.push('    web_api_journey: {')
    lines.push("      executor: 'ramping-vus',")
    lines.push('      startVUs: 0,')
    lines.push('      stages: [')
    lines.push('        { duration: RAMP_UP, target: VUS },')
    lines.push('        { duration: DURATION, target: VUS },')
    lines.push('        { duration: RAMP_DOWN, target: 0 },')
    lines.push('      ],')
    lines.push("      gracefulRampDown: '10s',")
    lines.push('    },')
    lines.push('  },')
    lines.push('  thresholds: {')
    lines.push("    http_req_failed: ['rate<0.05'],")
    lines.push("    http_req_duration: ['p(95)<1200'],")
    lines.push("    checks: ['rate>0.95'],")
    lines.push('  },')
    lines.push("  summaryTrendStats: ['avg', 'min', 'med', 'p(90)', 'p(95)', 'max'],")
    lines.push('}')
    lines.push('')
    lines.push('function buildAuthHeaders(token, extraHeaders = {}) {')
    lines.push('  const headers = {')
    lines.push("    Accept: 'application/json, text/plain, */*',")
    lines.push('    ...extraHeaders,')
    lines.push('  }')
    lines.push('')
    lines.push('  if (token) {')
    lines.push('    headers.Authorization = `Bearer ${token}`')
    lines.push('  }')
    lines.push('')
    lines.push('  return headers')
    lines.push('}')
    lines.push('')
    lines.push('function safeJson(response) {')
    lines.push('  try {')
    lines.push('    return response.json()')
    lines.push('  } catch (err) {')
    lines.push('    return null')
    lines.push('  }')
    lines.push('}')
    lines.push('')
    lines.push('function extractValue(obj, candidates) {')
    lines.push("  if (!obj || typeof obj !== 'object') {")
    lines.push('    return null')
    lines.push('  }')
    lines.push('')
    lines.push('  for (const key of candidates) {')
    lines.push("    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {")
    lines.push('      return obj[key]')
    lines.push('    }')
    lines.push('  }')
    lines.push('')
    lines.push('  return null')
    lines.push('}')
    lines.push('')
    lines.push('function withCorrelatedUser(pathWithQuery, effectiveUser) {')
    lines.push('  try {')
    lines.push("    const tmp = new URL(pathWithQuery, 'https://placeholder.local')")
    lines.push("    if (tmp.searchParams.has('userName')) {")
    lines.push("      tmp.searchParams.set('userName', effectiveUser)")
    lines.push('    }')
    lines.push('    return `${tmp.pathname}${tmp.search}`')
    lines.push('  } catch (err) {')
    lines.push('    return pathWithQuery')
    lines.push('  }')
    lines.push('}')
    lines.push('')
    lines.push('function withCorrelatedBody(body, effectiveUser) {')
    lines.push("  if (!body || typeof body !== 'string') {")
    lines.push('    return body')
    lines.push('  }')
    lines.push('')
    lines.push('  try {')
    lines.push('    const parsed = JSON.parse(body)')
    lines.push("    if (parsed && typeof parsed === 'object' && parsed.userName) {")
    lines.push('      parsed.userName = effectiveUser')
    lines.push('      return JSON.stringify(parsed)')
    lines.push('    }')
    lines.push('  } catch (err) {')
    lines.push('    return body')
    lines.push('  }')
    lines.push('')
    lines.push('  return body')
    lines.push('}')
    lines.push('')
    lines.push('export default function () {')
    lines.push('  const activeUser = USERS.length ? USERS[(__VU - 1) % USERS.length] : { userName: USERNAME, password: PASSWORD }')
    lines.push('  let authToken = null')
    lines.push('  let effectiveUser = activeUser.userName')
    lines.push('')

    const signinReq = requests.find((r) => r.method === 'post' && /\/signin\b/.test(r.path))
    if (signinReq) {
        lines.push("  group('01_signin_and_correlate_auth', () => {")
        lines.push('    if (!DO_SIGNIN) {')
        lines.push('      return')
        lines.push('    }')
        lines.push('')
        lines.push('    const signinPayload = JSON.stringify({')
        lines.push('      userName: activeUser.userName,')
        lines.push('      password: activeUser.password,')
        lines.push('    })')
        lines.push('')
        lines.push('    const signinRes = http.post(`${BASE_URL}/api/signin`, signinPayload, {')
        lines.push("      headers: buildAuthHeaders(null, { 'Content-Type': 'application/json;charset=UTF-8' }),")
        lines.push('      responseCallback: http.expectedStatuses({ min: 200, max: 499 }),')
        lines.push("      tags: { name: 'POST /api/signin' },")
        lines.push('    })')
        lines.push('')
        lines.push('    check(signinRes, {')
        lines.push("      'signin status is 200': (r) => r.status === 200,")
        lines.push('    })')
        lines.push('')
        lines.push('    const signinJson = safeJson(signinRes)')
        lines.push("    authToken = extractValue(signinJson, ['token', 'accessToken', 'jwt'])")
        lines.push("    effectiveUser = extractValue(signinJson, ['userName', 'username']) || activeUser.userName")
        lines.push('  })')
        if ((signinReq.thinkTimeSec || 0) > 0) {
            lines.push(`  sleep(${formatSleepSeconds(signinReq.thinkTimeSec)})`)
        }
        lines.push('')
    }

    let groupCounter = signinReq ? 2 : 1

    for (const req of requests) {
        if (signinReq && req === signinReq) {
            continue
        }

        const tagName = `${req.method.toUpperCase()} ${req.path}`
        const groupName = `${String(groupCounter).padStart(2, '0')}_${sanitizeName(`${req.method}_${req.path}`)}`
        lines.push(`  group('${escapeTemplateLiteral(groupName)}', () => {`)

        const pathExpression = req.path.includes('userName=')
            ? `withCorrelatedUser('${escapeTemplateLiteral(req.path)}', effectiveUser)`
            : `'${escapeTemplateLiteral(req.path)}'`

        if (['post', 'put', 'patch'].includes(req.method)) {
            const bodyExpr = req.body ? `withCorrelatedBody(${req.body}, effectiveUser)` : "''"
            // Preserve the captured Content-Type (default JSON) so the server can
            // parse the body; without it k6 sends text/plain and the request fails.
            const contentType = (req.contentType || 'application/json;charset=UTF-8').replace(/'/g, "\\'")
            lines.push(`    const res = http.${req.method}(\`${'${BASE_URL}'}\${${pathExpression}}\`, ${bodyExpr}, {`)
            lines.push(`      headers: buildAuthHeaders(authToken, { 'Content-Type': '${contentType}' }),`)
            lines.push(`      tags: { name: '${escapeTemplateLiteral(tagName)}' },`)
            lines.push('    })')
        } else {
            lines.push(`    const res = http.${req.method}(\`${'${BASE_URL}'}\${${pathExpression}}\`, {`)
            lines.push('      headers: buildAuthHeaders(authToken),')
            lines.push(`      tags: { name: '${escapeTemplateLiteral(tagName)}' },`)
            lines.push('    })')
        }

        lines.push('')
        lines.push('    check(res, {')
        lines.push("      'status is 200': (r) => r.status == 200,")
        lines.push('    })')
        lines.push('  })')
        if ((req.thinkTimeSec || 0) > 0) {
            lines.push(`  sleep(${formatSleepSeconds(req.thinkTimeSec)})`)
        }
        lines.push('')

        groupCounter += 1
    }

    lines.push('}')
    lines.push('')
    lines.push('export function handleSummary(data) {')
    lines.push('  return {')
    lines.push('    "summary.html": htmlReport(data),')
    lines.push('    "summary.txt": textSummary(data, { indent: " ", enableColors: true }),')
    lines.push('  }')
    lines.push('}')

    return `${lines.join('\n')}\n`
}

function convert(inputPath, outputPath) {
    const inputText = fs.readFileSync(inputPath, 'utf8')
    const requests = parseRequests(inputText)

    if (requests.length === 0) {
        throw new Error('No http.* requests were found in input script.')
    }

    const primaryOrigin = inferPrimaryOrigin(requests.map((r) => r.url))
    if (!primaryOrigin) {
        throw new Error('Could not infer primary origin from requests.')
    }

    const firstPartyRequests = requests
        .filter((r) => {
            try {
                const u = new URL(r.url)
                return u.origin === primaryOrigin
            } catch (err) {
                return false
            }
        })
        .map((r) => {
            const u = new URL(r.url)
            return { ...r, path: toRelativeWithQuery(u), urlObj: u }
        })
        .filter((r) => !isLikelyStaticAsset(r.urlObj))
        .filter((r) => !/\/failed-request\b/.test(r.path))

    const uniqueRequests = uniqueByMethodUrl(firstPartyRequests)

    if (uniqueRequests.length === 0) {
        throw new Error('No first-party API-style requests left after filtering.')
    }

    const harPath = inputPath.endsWith('.k6firstversion.js')
        ? inputPath.replace(/\.k6firstversion\.js$/i, '.har')
        : path.join(path.dirname(inputPath), `${path.basename(inputPath, path.extname(inputPath))}.har`)

    const thinkTimeMap = buildThinkTimeMapFromHar(harPath, primaryOrigin)

    const requestsWithThinkTime = uniqueRequests.map((req) => {
        const urlKey = requestKey(req.method, req.url)
        const pathKey = requestPathKey(req.method, req.path)
        const thinkTimeSec = thinkTimeMap.byUrlKey.has(urlKey)
            ? thinkTimeMap.byUrlKey.get(urlKey)
            : (thinkTimeMap.byPathKey.get(pathKey) || 0)

        return {
            ...req,
            thinkTimeSec,
        }
    })

    const signinDefaults = tryReadSigninDefaults(requestsWithThinkTime)
    const outputText = buildOutput({
        baseOrigin: primaryOrigin,
        requests: requestsWithThinkTime,
        signinDefaults,
    })

    fs.writeFileSync(outputPath, outputText, 'utf8')

    return {
        totalRequests: requests.length,
        keptRequests: requestsWithThinkTime.length,
        baseOrigin: primaryOrigin,
    }
}

function main() {
    const { input, output } = parseArgs(process.argv.slice(2))
    const inputPath = path.resolve(process.cwd(), input)
    const outputPath = path.resolve(process.cwd(), output)

    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`)
    }

    const result = convert(inputPath, outputPath)
    console.log(`Converted ${path.basename(inputPath)} -> ${path.basename(outputPath)}`)
    console.log(`Primary origin: ${result.baseOrigin}`)
    console.log(`Requests: kept ${result.keptRequests} of ${result.totalRequests}`)
}

if (require.main === module) {
    try {
        main()
    } catch (err) {
        console.error(`Conversion failed: ${err.message}`)
        process.exit(1)
    }
}

// Exported so alternate ingestion adapters (e.g. OTLP traces, access logs)
// can reuse the exact same enrichment / correlation / parameterization engine.
module.exports = {
    main,
    convert,
    buildOutput,
    isLikelyStaticAsset,
    inferPrimaryOrigin,
    tryReadSigninDefaults,
    uniqueByMethodUrl,
    requestKey,
    requestPathKey,
    toRelativeWithQuery,
    sanitizeName,
    escapeTemplateLiteral,
}
