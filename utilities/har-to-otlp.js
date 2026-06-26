#!/usr/bin/env node

/**
 * HAR -> OTLP/JSON trace adapter.
 *
 * Re-expresses the requests captured in a HAR file as an OpenTelemetry
 * (OTLP/JSON) trace export. The requests are real (captured against the live
 * site); only the envelope is reconstructed, so the same traffic can be fed
 * through the OTel ingestion path that a production system would emit natively.
 *
 *   one HAR file  => one trace (a single user journey)
 *   one HTTP entry => one span
 *
 * Usage: node har-to-otlp.js -i <input.har> -o <output.otlp.json> [-s service]
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

function parseArgs(argv) {
    let input = null
    let output = null
    let service = 'har-import'

    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i]
        if (token === '-i' || token === '--input') {
            input = argv[i + 1]
            i += 1
        } else if (token === '-o' || token === '--output') {
            output = argv[i + 1]
            i += 1
        } else if (token === '-s' || token === '--service') {
            service = argv[i + 1]
            i += 1
        }
    }

    return { input, output, service }
}

function attr(key, value) {
    if (typeof value === 'number' && Number.isInteger(value)) {
        return { key, value: { intValue: String(value) } }
    }
    return { key, value: { stringValue: String(value) } }
}

function msToUnixNano(ms) {
    // epoch-ms * 1e6 overflows Number.MAX_SAFE_INTEGER, so use BigInt.
    return (BigInt(Math.round(ms)) * 1000000n).toString()
}

function harToOtlp(harPath, serviceName) {
    const parsed = JSON.parse(fs.readFileSync(harPath, 'utf8'))
    const entries = Array.isArray(parsed && parsed.log && parsed.log.entries)
        ? parsed.log.entries
        : []

    const traceId = crypto.randomBytes(16).toString('hex')
    const observations = []

    for (const entry of entries) {
        const req = entry && entry.request
        if (!req || !req.method || !req.url) {
            continue
        }

        let u
        try {
            u = new URL(req.url)
        } catch (err) {
            continue
        }

        const started = Date.parse(entry.startedDateTime)
        if (!Number.isFinite(started)) {
            continue
        }

        const durationMs = typeof entry.time === 'number' && entry.time > 0 ? entry.time : 0
        const statusCode = (entry.response && entry.response.status) || 0
        const bodyText = (req.postData && req.postData.text) || ''
        const contentTypeHeader = (req.headers || []).find(
            (h) => String(h.name).toLowerCase() === 'content-type'
        )

        observations.push({
            started,
            durationMs,
            method: req.method.toUpperCase(),
            url: req.url,
            urlObj: u,
            statusCode,
            bodyText,
            contentType: contentTypeHeader ? contentTypeHeader.value : null,
        })
    }

    observations.sort((a, b) => a.started - b.started)

    const spans = observations.map((o) => {
        const attributes = [
            attr('http.request.method', o.method),
            attr('url.full', o.url),
            attr('url.scheme', o.urlObj.protocol.replace(/:$/, '')),
            attr('server.address', o.urlObj.hostname),
            attr('url.path', o.urlObj.pathname),
            attr('url.query', o.urlObj.search ? o.urlObj.search.replace(/^\?/, '') : ''),
            attr('http.response.status_code', o.statusCode),
        ]

        if (o.bodyText) {
            attributes.push(attr('http.request.body', o.bodyText))
        }
        if (o.contentType) {
            attributes.push(attr('http.request.header.content-type', o.contentType))
        }

        return {
            traceId,
            spanId: crypto.randomBytes(8).toString('hex'),
            name: `${o.method} ${o.urlObj.pathname}`,
            kind: 3, // SPAN_KIND_CLIENT (HAR is client-side traffic)
            startTimeUnixNano: msToUnixNano(o.started),
            endTimeUnixNano: msToUnixNano(o.started + o.durationMs),
            attributes,
            status: { code: o.statusCode >= 400 || o.statusCode === 0 ? 2 : 1 },
        }
    })

    return {
        resourceSpans: [
            {
                resource: {
                    attributes: [attr('service.name', serviceName)],
                },
                scopeSpans: [
                    {
                        scope: { name: 'har-to-otlp', version: '1.0.0' },
                        spans,
                    },
                ],
            },
        ],
    }
}

function main() {
    const { input, output, service } = parseArgs(process.argv.slice(2))
    if (!input || !output) {
        throw new Error('Usage: har-to-otlp.js -i <input.har> -o <output.otlp.json> [-s service]')
    }

    const inputPath = path.resolve(process.cwd(), input)
    const outputPath = path.resolve(process.cwd(), output)
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input HAR not found: ${inputPath}`)
    }

    const otlp = harToOtlp(inputPath, service)
    const spanCount = otlp.resourceSpans[0].scopeSpans[0].spans.length
    fs.writeFileSync(outputPath, JSON.stringify(otlp, null, 2), 'utf8')

    console.log(`HAR -> OTLP: ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${spanCount} spans)`)
}

if (require.main === module) {
    try {
        main()
    } catch (err) {
        console.error(`HAR->OTLP failed: ${err.message}`)
        process.exit(1)
    }
}

module.exports = { harToOtlp }
