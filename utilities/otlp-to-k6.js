#!/usr/bin/env node

/**
 * OTLP/JSON trace -> enriched k6 script.
 *
 * Reads an OpenTelemetry (OTLP/JSON) trace export, reconstructs the ordered
 * HTTP request flow (one trace = one user journey), derives think times from
 * span timing, and emits the SAME enriched, correlated, parameterized k6
 * script that the HAR path produces -- proving the conversion engine is
 * source-agnostic. Works against any OTLP/JSON, whether produced by our
 * har-to-otlp adapter or exported natively by a production collector.
 *
 * Usage: node otlp-to-k6.js -i <input.otlp.json> -o <output.js>
 */

const fs = require('fs')
const path = require('path')
const {
    buildOutput,
    isLikelyStaticAsset,
    inferPrimaryOrigin,
    tryReadSigninDefaults,
    toRelativeWithQuery,
    requestKey,
} = require('./convert_k6_tests.js')

function parseArgs(argv) {
    let input = null
    let output = null

    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i]
        if (token === '-i' || token === '--input') {
            input = argv[i + 1]
            i += 1
        } else if (token === '-o' || token === '--output') {
            output = argv[i + 1]
            i += 1
        }
    }

    return { input, output }
}

function attrMap(attributes) {
    const map = {}
    for (const a of attributes || []) {
        if (!a || !a.key || !a.value) {
            continue
        }
        const v = a.value
        if (v.stringValue !== undefined) {
            map[a.key] = v.stringValue
        } else if (v.intValue !== undefined) {
            map[a.key] = Number(v.intValue)
        } else if (v.doubleValue !== undefined) {
            map[a.key] = v.doubleValue
        } else if (v.boolValue !== undefined) {
            map[a.key] = v.boolValue
        }
    }
    return map
}

function nanoToMs(nano) {
    try {
        return Number(BigInt(nano) / 1000000n)
    } catch (err) {
        return Number(nano) / 1e6
    }
}

// Produce a single-quoted JS string literal (matches the body format the
// HAR path feeds into buildOutput / withCorrelatedBody / tryReadSigninDefaults).
function toJsStringLiteral(raw) {
    const escaped = String(raw)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
    return `'${escaped}'`
}

function collectSpans(otlp) {
    const spans = []
    const resourceSpans = Array.isArray(otlp && otlp.resourceSpans) ? otlp.resourceSpans : []

    for (const rs of resourceSpans) {
        const scopeSpans = Array.isArray(rs && rs.scopeSpans)
            ? rs.scopeSpans
            : Array.isArray(rs && rs.instrumentationLibrarySpans)
                ? rs.instrumentationLibrarySpans
                : []
        for (const ss of scopeSpans) {
            for (const span of (ss && ss.spans) || []) {
                spans.push(span)
            }
        }
    }

    return spans
}

function reconstructUrl(a) {
    if (a['url.full']) return a['url.full']
    if (a['http.url']) return a['http.url']

    const scheme = a['url.scheme'] || 'https'
    const host = a['server.address'] || a['net.host.name'] || a['http.host']
    const p = a['url.path'] || a['http.target'] || '/'
    const q = a['url.query'] ? `?${a['url.query']}` : ''
    if (host) {
        return `${scheme}://${host}${p}${q}`
    }
    return null
}

function buildFlow(otlp) {
    const flow = []

    for (const span of collectSpans(otlp)) {
        const a = attrMap(span.attributes)
        const methodRaw = String(a['http.request.method'] || a['http.method'] || '').toLowerCase()
        if (!methodRaw) {
            continue
        }

        const method = methodRaw === 'del' ? 'delete' : methodRaw
        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
            continue
        }

        const url = reconstructUrl(a)
        if (!url) {
            continue
        }

        let urlObj
        try {
            urlObj = new URL(url)
        } catch (err) {
            continue
        }

        const started = span.startTimeUnixNano ? nanoToMs(span.startTimeUnixNano) : 0
        const ended = span.endTimeUnixNano ? nanoToMs(span.endTimeUnixNano) : started
        const status = a['http.response.status_code'] || a['http.status_code'] || 0
        const bodyRaw = a['http.request.body'] || ''
        const contentType = a['http.request.header.content-type'] || ''

        flow.push({
            method,
            url,
            urlObj,
            started: Number.isFinite(started) ? started : 0,
            ended: Number.isFinite(ended) ? ended : (Number.isFinite(started) ? started : 0),
            status,
            bodyRaw,
            contentType,
        })
    }

    flow.sort((a, b) => a.started - b.started)
    return flow
}

function convert(inputPath, outputPath) {
    const otlp = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
    const flow = buildFlow(otlp)

    if (flow.length === 0) {
        throw new Error('No HTTP spans found in OTLP input.')
    }

    const primaryOrigin = inferPrimaryOrigin(flow.map((f) => f.url))
    if (!primaryOrigin) {
        throw new Error('Could not infer primary origin from spans.')
    }

    const firstParty = flow
        .filter((f) => f.urlObj.origin === primaryOrigin)
        .map((f) => ({ ...f, path: toRelativeWithQuery(f.urlObj) }))
        .filter((f) => !isLikelyStaticAsset(f.urlObj))
        .filter((f) => !/\/failed-request\b/.test(f.path))

    if (firstParty.length === 0) {
        throw new Error('No first-party API-style spans left after filtering.')
    }

    // Dedupe by method+url, keeping first occurrence and preserving order.
    const seen = new Set()
    const unique = []
    for (const f of firstParty) {
        const key = requestKey(f.method, f.url)
        if (seen.has(key)) {
            continue
        }
        seen.add(key)
        unique.push(f)
    }

    // Think time = gap between this request ending and the next one starting.
    const requests = unique.map((f, i) => {
        const next = unique[i + 1]
        const gapMs = next ? Math.max(0, next.started - f.ended) : 0
        const body = ['post', 'put', 'patch'].includes(f.method) && f.bodyRaw
            ? toJsStringLiteral(f.bodyRaw)
            : null

        return {
            method: f.method,
            url: f.url,
            path: f.path,
            body,
            contentType: f.contentType || undefined,
            thinkTimeSec: gapMs / 1000,
        }
    })

    const signinDefaults = tryReadSigninDefaults(requests)
    const outputText = buildOutput({
        baseOrigin: primaryOrigin,
        requests,
        signinDefaults,
    })

    fs.writeFileSync(outputPath, outputText, 'utf8')

    return {
        totalSpans: flow.length,
        keptRequests: requests.length,
        baseOrigin: primaryOrigin,
    }
}

function main() {
    const { input, output } = parseArgs(process.argv.slice(2))
    if (!input || !output) {
        throw new Error('Usage: otlp-to-k6.js -i <input.otlp.json> -o <output.js>')
    }

    const inputPath = path.resolve(process.cwd(), input)
    const outputPath = path.resolve(process.cwd(), output)
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input OTLP not found: ${inputPath}`)
    }

    const result = convert(inputPath, outputPath)
    console.log(`OTLP -> k6: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`)
    console.log(`Primary origin: ${result.baseOrigin}`)
    console.log(`Requests: kept ${result.keptRequests} from ${result.totalSpans} spans`)
}

if (require.main === module) {
    try {
        main()
    } catch (err) {
        console.error(`OTLP->k6 failed: ${err.message}`)
        process.exit(1)
    }
}

module.exports = { convert }
