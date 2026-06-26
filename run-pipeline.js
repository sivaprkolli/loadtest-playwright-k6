#!/usr/bin/env node

/**
 * Full automation pipeline:
 *  Step 1 - Run Playwright tests (generates testathon_trace.har)
 *  Step 2 - Convert HAR to k6 script using har-to-k6
 *  Step 3 - Convert to enriched k6 test using convert-k6.js
 *  Step 4 - Execute k6 load test on generated file
 *  Step 5 - Open summary.html report in the default browser
 */

const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const ROOT = __dirname
const REPORTS_DIR = path.join(ROOT, 'reports')
const UTILITIES_DIR = path.join(ROOT, 'utilities')
const INGESTED_HAR_NAME = 'imported_traffic.har'

function step(label) {
    console.log('\n' + '='.repeat(60))
    console.log(`  ${label}`)
    console.log('='.repeat(60))
}

function run(cmd, opts = {}) {
    const { allowFailure = false } = opts
    console.log(`\n> ${cmd}\n`)
    const result = spawnSync(cmd, {
        shell: true,
        cwd: ROOT,
        stdio: 'inherit',
        ...opts,
    })
    if (result.status !== 0) {
        if (allowFailure) {
            console.warn(`\nCommand finished with non-zero exit code ${result.status}: ${cmd}`)
            return result.status || 1
        }
        console.error(`\nCommand failed with exit code ${result.status}: ${cmd}`)
        process.exit(result.status || 1)
    }
    return 0
}

function removeIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { force: true })
    }
}

function getHarFiles(dirPath) {
    return fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.har'))
        .map((entry) => entry.name)
}

function baseNameFromHar(harName) {
    return path.basename(harName, '.har')
}

function openInDefaultBrowser(filePath) {
    const openCmd =
        process.platform === 'win32'
            ? `start "" "${filePath}"`
            : process.platform === 'darwin'
                ? `open "${filePath}"`
                : `xdg-open "${filePath}"`
    run(openCmd)
}

function quoteIfNeeded(value) {
    if (!value) {
        return ''
    }
    return value.includes(' ') ? `"${value}"` : value
}

function envList(name) {
    const raw = process.env[name]
    if (!raw) {
        return []
    }
    return raw
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
}

function buildIngestionCommand() {
    const appLogs = envList('INGEST_APP_LOGS')
    const apiGatewayLogs = envList('INGEST_API_GATEWAY_LOGS')
    const otelLogs = envList('INGEST_OTEL')
    const observabilityLogs = envList('INGEST_OBSERVABILITY')

    const hasAnySource =
        appLogs.length > 0 ||
        apiGatewayLogs.length > 0 ||
        otelLogs.length > 0 ||
        observabilityLogs.length > 0

    if (!hasAnySource) {
        return null
    }

    const parts = [
        `node ${quoteIfNeeded(path.join(UTILITIES_DIR, 'traffic-ingest.js'))}`,
        `--out ${quoteIfNeeded(path.join(ROOT, INGESTED_HAR_NAME))}`,
    ]

    for (const p of appLogs) {
        parts.push(`--appLogs ${quoteIfNeeded(path.resolve(ROOT, p))}`)
    }
    for (const p of apiGatewayLogs) {
        parts.push(`--apiGatewayLogs ${quoteIfNeeded(path.resolve(ROOT, p))}`)
    }
    for (const p of otelLogs) {
        parts.push(`--otel ${quoteIfNeeded(path.resolve(ROOT, p))}`)
    }
    for (const p of observabilityLogs) {
        parts.push(`--observability ${quoteIfNeeded(path.resolve(ROOT, p))}`)
    }

    return parts.join(' ')
}

// ── Step 0: Cleanup previous artifacts ─────────────────────────────────────
step('Step 0: Cleaning previous artifacts')
if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
}

for (const file of fs.readdirSync(ROOT)) {
    const lower = file.toLowerCase()
    if (
        lower.endsWith('.har') ||
        lower.endsWith('.k6firstversion.js') ||
        lower.endsWith('.k6updatedversion.js')
    ) {
        removeIfExists(path.join(ROOT, file))
    }
}

for (const file of fs.readdirSync(REPORTS_DIR)) {
    const lower = file.toLowerCase()
    if (
        lower.endsWith('.har') ||
        lower.endsWith('.k6firstversion.js') ||
        lower.endsWith('.k6updatedversion.js') ||
        lower.endsWith('.otlp.json') ||
        lower.endsWith('.otlp.k6.js') ||
        lower.endsWith('.summary.html') ||
        lower.endsWith('.summary.txt') ||
        lower === 'summary.html' ||
        lower === 'summary.txt'
    ) {
        removeIfExists(path.join(REPORTS_DIR, file))
    }
}

// ── Step 1: Ingestion or Playwright ─────────────────────────────────────────
const ingestionCmd = buildIngestionCommand()
if (ingestionCmd) {
    step('Step 1: Ingesting traffic from logs/OTel/observability exports')
    run(ingestionCmd)
} else {
    step('Step 1: Running Playwright tests')
    run('npx playwright test --headed --trace on --reporter=list') // Adjust as needed for your test command
}

const generatedHarFiles = getHarFiles(ROOT)
if (generatedHarFiles.length === 0) {
    console.error('\nNo HAR files found after Playwright run in project root.')
    console.error('Either run Playwright with HAR capture or set INGEST_* environment variables for logs/OTel ingestion.')
    process.exit(1)
}

const htmlReportsToOpen = []

for (const harName of generatedHarFiles) {
    const testName = baseNameFromHar(harName)
    const rootHarFile = path.join(ROOT, harName)
    const harFile = path.join(REPORTS_DIR, `${testName}.har`)
    const k6RawFile = path.join(REPORTS_DIR, `${testName}.k6firstversion.js`)
    const k6EnrichedFile = path.join(REPORTS_DIR, `${testName}.k6updatedversion.js`)
    const summaryHtml = path.join(REPORTS_DIR, `${testName}.summary.html`)
    const summaryTxt = path.join(REPORTS_DIR, `${testName}.summary.txt`)
    const otlpJson = path.join(REPORTS_DIR, `${testName}.otlp.json`)
    const k6FromOtlpFile = path.join(REPORTS_DIR, `${testName}.otlp.k6.js`)
    const otlpSummaryHtml = path.join(REPORTS_DIR, `${testName}.otlp.summary.html`)
    const otlpSummaryTxt = path.join(REPORTS_DIR, `${testName}.otlp.summary.txt`)

    removeIfExists(harFile)
    removeIfExists(k6RawFile)
    removeIfExists(k6EnrichedFile)
    removeIfExists(summaryHtml)
    removeIfExists(summaryTxt)
    removeIfExists(otlpJson)
    removeIfExists(k6FromOtlpFile)
    removeIfExists(otlpSummaryHtml)
    removeIfExists(otlpSummaryTxt)

    fs.renameSync(rootHarFile, harFile)

    step(`Step 2: Converting HAR to k6 script (har-to-k6) for ${testName}`)
    run(`har-to-k6 "${harFile}" -o "${k6RawFile}"`)

    step(`Step 3: Converting to enriched k6 test (convert-k6.js) for ${testName}`)
    run(`node "${path.join(UTILITIES_DIR, 'convert-k6.js')}" -i "${k6RawFile}" -o "${k6EnrichedFile}"`)

    step(`Step 4: Running k6 load test for ${testName}`)
    const k6ExitCode = run(`k6 run "${k6EnrichedFile}"`, { allowFailure: true, cwd: REPORTS_DIR })
    if (k6ExitCode !== 0) {
        console.warn(`k6 finished with threshold failures for ${testName}. Continuing.`)
    }

    step(`Step 5: Renaming and opening HTML report for ${testName}`)
    const defaultHtml = path.join(REPORTS_DIR, 'summary.html')
    const defaultTxt = path.join(REPORTS_DIR, 'summary.txt')

    if (fs.existsSync(defaultHtml)) {
        removeIfExists(summaryHtml)
        fs.renameSync(defaultHtml, summaryHtml)
    }
    if (fs.existsSync(defaultTxt)) {
        removeIfExists(summaryTxt)
        fs.renameSync(defaultTxt, summaryTxt)
    }

    if (!fs.existsSync(summaryHtml)) {
        console.warn(`\nsummary.html not found for ${testName} at ${summaryHtml}`)
    } else {
        htmlReportsToOpen.push(summaryHtml)
    }

    // ── OTLP ingestion branch: HAR -> OTLP trace -> enriched k6 -> report ────
    step(`Step 6: Converting HAR to OTLP trace (har-to-otlp.js) for ${testName}`)
    run(`node "${path.join(UTILITIES_DIR, 'har-to-otlp.js')}" -i "${harFile}" -o "${otlpJson}" -s "${testName}"`)

    step(`Step 7: Converting OTLP trace to enriched k6 test (otlp-to-k6.js) for ${testName}`)
    run(`node "${path.join(UTILITIES_DIR, 'otlp-to-k6.js')}" -i "${otlpJson}" -o "${k6FromOtlpFile}"`)

    step(`Step 8: Running k6 load test (OTLP-derived) for ${testName}`)
    const k6OtlpExitCode = run(`k6 run "${k6FromOtlpFile}"`, { allowFailure: true, cwd: REPORTS_DIR })
    if (k6OtlpExitCode !== 0) {
        console.warn(`k6 (OTLP) finished with threshold failures for ${testName}. Continuing.`)
    }

    step(`Step 9: Renaming and opening OTLP HTML report for ${testName}`)
    if (fs.existsSync(defaultHtml)) {
        removeIfExists(otlpSummaryHtml)
        fs.renameSync(defaultHtml, otlpSummaryHtml)
    }
    if (fs.existsSync(defaultTxt)) {
        removeIfExists(otlpSummaryTxt)
        fs.renameSync(defaultTxt, otlpSummaryTxt)
    }

    if (!fs.existsSync(otlpSummaryHtml)) {
        console.warn(`\nOTLP summary.html not found for ${testName} at ${otlpSummaryHtml}`)
    } else {
        htmlReportsToOpen.push(otlpSummaryHtml)
    }
}

for (const reportPath of htmlReportsToOpen) {
    openInDefaultBrowser(reportPath)
}

console.log('\n' + '='.repeat(60))
console.log('  Pipeline complete!')
console.log('='.repeat(60) + '\n')
