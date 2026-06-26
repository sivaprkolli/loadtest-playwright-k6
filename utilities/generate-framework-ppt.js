#!/usr/bin/env node

const path = require('path')
const PptxGenJS = require('pptxgenjs')

const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'reports', 'Traffic2Test_Framework_Walkthrough.pptx')

const pptx = new PptxGenJS()
pptx.layout = 'LAYOUT_WIDE'
pptx.author = 'Traffic2Test Automation'
pptx.company = 'Feuji Hackathon'
pptx.subject = 'Framework walkthrough and pipeline explanation'
pptx.title = 'Traffic2Test Framework - End-to-End Walkthrough'
pptx.lang = 'en-US'
pptx.theme = {
    headFontFace: 'Aptos Display',
    bodyFontFace: 'Aptos',
    lang: 'en-US',
}

const colors = {
    bg: 'F6F9FC',
    title: '0B1F3A',
    accent: '0E7490',
    lightAccent: 'E0F2FE',
    text: '1F2937',
    white: 'FFFFFF',
    muted: '6B7280',
    ok: '0F766E',
}

function addBackground(slide) {
    slide.background = { color: colors.bg }
    slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.33,
        h: 0.4,
        fill: { color: colors.accent },
        line: { color: colors.accent },
    })
}

function addTitle(slide, title, subtitle) {
    slide.addText(title, {
        x: 0.5,
        y: 0.55,
        w: 12.2,
        h: 0.6,
        fontFace: 'Aptos Display',
        fontSize: 30,
        bold: true,
        color: colors.title,
    })

    if (subtitle) {
        slide.addText(subtitle, {
            x: 0.5,
            y: 1.2,
            w: 12.2,
            h: 0.4,
            fontSize: 15,
            color: colors.muted,
        })
    }
}

function addBullets(slide, items, opts = {}) {
    const x = opts.x || 0.8
    const y = opts.y || 1.85
    const w = opts.w || 12
    const h = opts.h || 5

    const runs = items.map((item) => ({
        text: item,
        options: { bullet: { indent: 14 }, breakLine: true },
    }))

    slide.addText(runs, {
        x,
        y,
        w,
        h,
        fontSize: 18,
        color: colors.text,
        valign: 'top',
        margin: 3,
    })
}

function addStepCard(slide, index, title, detail, y) {
    slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y,
        w: 12,
        h: 0.95,
        rectRadius: 0.08,
        fill: { color: colors.white },
        line: { color: 'C7D2FE', pt: 1 },
        shadow: { type: 'outer', color: 'CBD5E1', blur: 2, angle: 45, distance: 1 },
    })

    slide.addShape(pptx.ShapeType.ellipse, {
        x: 1.05,
        y: y + 0.18,
        w: 0.5,
        h: 0.5,
        fill: { color: colors.accent },
        line: { color: colors.accent },
    })

    slide.addText(String(index), {
        x: 1.215,
        y: y + 0.27,
        w: 0.2,
        h: 0.2,
        color: colors.white,
        bold: true,
        fontSize: 12,
        align: 'center',
    })

    slide.addText(title, {
        x: 1.7,
        y: y + 0.16,
        w: 4.8,
        h: 0.3,
        bold: true,
        color: colors.title,
        fontSize: 15,
    })

    slide.addText(detail, {
        x: 1.7,
        y: y + 0.46,
        w: 10.8,
        h: 0.35,
        color: colors.text,
        fontSize: 12,
    })
}

function slide1Title() {
    const slide = pptx.addSlide()
    addBackground(slide)

    slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.7,
        y: 1.2,
        w: 11.9,
        h: 4.7,
        rectRadius: 0.12,
        fill: { color: colors.white },
        line: { color: 'BFDBFE', pt: 1 },
    })

    slide.addText('Traffic2Test Framework', {
        x: 1.1,
        y: 2.05,
        w: 10.8,
        h: 0.8,
        fontFace: 'Aptos Display',
        fontSize: 40,
        bold: true,
        color: colors.title,
        align: 'center',
    })

    slide.addText('Automated Load Test Script Generation from Production-Style Traffic', {
        x: 1.1,
        y: 3,
        w: 10.8,
        h: 0.5,
        fontSize: 18,
        color: colors.muted,
        align: 'center',
    })

    slide.addText('Feuji Hackathon | End-to-End Workflow', {
        x: 1.1,
        y: 3.55,
        w: 10.8,
        h: 0.4,
        fontSize: 14,
        color: colors.accent,
        align: 'center',
        bold: true,
    })
}

function slide2Agenda() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Agenda', 'Complete walkthrough from setup to reports')

    addBullets(slide, [
        '1. Problem statement and objective from the UseCase',
        '2. Architecture and supported traffic sources',
        '3. Repository structure and key scripts',
        '4. Setup and prerequisites',
        '5. Pipeline execution step-by-step',
        '6. Output artifacts and report interpretation',
        '7. Business value, limitations, and next enhancements',
    ])
}

function slide3UseCase() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'UseCase: Why This Framework Exists', 'Automated load test generation from real traffic patterns')

    addBullets(slide, [
        'Objective: Automatically generate realistic performance test scripts with minimal manual effort.',
        'Inputs: App logs, API gateway logs, OpenTelemetry traces, and observability exports.',
        'Intelligence: Reconstruct user journeys and convert to executable load tests.',
        'Targets: k6 (implemented), architecture designed to be extensible to JMeter/Gatling style flows.',
        'Expected result: Faster setup, better realism, and improved scalability validation.',
    ])
}

function slide4Architecture() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Framework Architecture', 'Two ingestion paths converge into enriched k6 execution')

    const boxes = [
        { x: 0.8, y: 2.0, t: 'Traffic Sources\n(Logs / OTel / HAR)', c: 'DBEAFE' },
        { x: 3.2, y: 2.0, t: 'Ingestion\ntraffic-ingest.js\nOR Playwright HAR capture', c: 'E0F2FE' },
        { x: 5.7, y: 2.0, t: 'Conversion\nHAR -> k6\nHAR -> OTLP -> k6', c: 'EDE9FE' },
        { x: 8.2, y: 2.0, t: 'Enrichment\nCorrelation + thresholds\nusers.csv parameterization', c: 'DCFCE7' },
        { x: 10.7, y: 2.0, t: 'Execution\nk6 run + HTML/TXT\nsummary reports', c: 'FCE7F3' },
    ]

    for (const b of boxes) {
        slide.addShape(pptx.ShapeType.roundRect, {
            x: b.x,
            y: b.y,
            w: 2.2,
            h: 1.35,
            rectRadius: 0.08,
            fill: { color: b.c },
            line: { color: '94A3B8', pt: 1 },
        })
        slide.addText(b.t, {
            x: b.x + 0.1,
            y: b.y + 0.15,
            w: 2.0,
            h: 1.05,
            fontSize: 11,
            bold: true,
            color: colors.title,
            align: 'center',
            valign: 'mid',
        })
    }

    for (let i = 0; i < 4; i += 1) {
        slide.addShape(pptx.ShapeType.chevron, {
            x: 2.95 + i * 2.5,
            y: 2.45,
            w: 0.25,
            h: 0.45,
            fill: { color: colors.accent },
            line: { color: colors.accent },
        })
    }

    slide.addText('Main runner: npm run pipeline (run-pipeline.js)', {
        x: 0.9,
        y: 4.15,
        w: 11.8,
        h: 0.4,
        fontSize: 14,
        color: colors.ok,
        bold: true,
        align: 'center',
    })
}

function slide5RepoMap() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Codebase Map', 'What each folder contributes to the flow')

    addBullets(slide, [
        'tests/: Playwright scenarios that capture HAR traffic (for example addProductAndCheckout.spec.ts).',
        'utilities/: Conversion and transformation scripts (convert-k6.js, convert_k6_tests.js, har-to-otlp.js, otlp-to-k6.js).',
        'run-pipeline.js: Orchestrates cleanup, conversion, load execution, and report opening.',
        'testData/users.csv: Data source for user parameterization during k6 runs.',
        'reports/: Generated HAR files, k6 scripts, OTLP files, and HTML/TXT summaries.',
    ])
}

function slide6PrereqSetup() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 1: Prerequisites and Setup', 'Environment bootstrap before first pipeline run')

    addStepCard(slide, 1, 'Install Node.js', 'Use Node.js v22+ as recommended in README.', 1.9)
    addStepCard(slide, 2, 'Install project dependencies', 'Run: npm install', 2.95)
    addStepCard(slide, 3, 'Install k6', 'Run: npm run install:k6 (uses winget on Windows).', 4.0)
    addStepCard(slide, 4, 'Install har-to-k6 CLI', 'Run: npm install -g har-to-k6', 5.05)
}

function slide7ExecutionEntry() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 2: Start the Pipeline', 'Single command entry point')

    slide.addShape(pptx.ShapeType.roundRect, {
        x: 1.0,
        y: 2.2,
        w: 11.2,
        h: 1.2,
        rectRadius: 0.1,
        fill: { color: '0F172A' },
        line: { color: '0F172A' },
    })

    slide.addText('npm run pipeline', {
        x: 1.25,
        y: 2.58,
        w: 10.7,
        h: 0.45,
        fontFace: 'Consolas',
        fontSize: 30,
        bold: true,
        color: colors.white,
        align: 'center',
    })

    addBullets(slide, [
        'Alternative: node run-pipeline.js',
        'Default behavior: executes Playwright tests and processes each generated HAR.',
        'Optional ingestion mode: set INGEST_APP_LOGS / INGEST_API_GATEWAY_LOGS / INGEST_OTEL / INGEST_OBSERVABILITY to bypass Playwright capture.',
    ], { y: 3.8, h: 2.4 })
}

function slide8PipelineCore() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 3: Core Pipeline Stages (0-5)', 'Main path implemented in run-pipeline.js')

    addStepCard(slide, 0, 'Cleanup', 'Removes previous HAR, k6 scripts, OTLP files, and summary reports.', 1.65)
    addStepCard(slide, 1, 'Ingest or Capture', 'Either ingest log-derived traffic or run Playwright tests to generate HAR.', 2.6)
    addStepCard(slide, 2, 'HAR to Raw k6', 'har-to-k6 converts <test>.har into <test>.k6firstversion.js.', 3.55)
    addStepCard(slide, 3, 'Enrich k6 Script', 'convert-k6.js adds realistic logic, checks, thresholds, and summary output.', 4.5)
    addStepCard(slide, 4, 'Execute k6', 'Runs k6 and tolerates threshold failures while continuing pipeline.', 5.45)
}

function slide9OtlpPath() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 4: OTLP Branch (Stages 6-9)', 'Source-agnostic path for observability-driven testing')

    addStepCard(slide, 6, 'HAR to OTLP JSON', 'har-to-otlp.js maps HAR entries to OpenTelemetry spans.', 1.75)
    addStepCard(slide, 7, 'OTLP to Enriched k6', 'otlp-to-k6.js reconstructs journey and reuses same enrichment engine.', 2.8)
    addStepCard(slide, 8, 'Execute OTLP-derived k6', 'Runs k6 load test from OTLP path and captures reports.', 3.85)
    addStepCard(slide, 9, 'Publish OTLP Reports', 'Renames summary files to <test>.otlp.summary.html/.txt and opens browser.', 4.9)

    slide.addText('Outcome: You can validate performance either from browser-captured HAR or observability exports.', {
        x: 0.9,
        y: 6.1,
        w: 12,
        h: 0.4,
        fontSize: 13,
        color: colors.ok,
        bold: true,
        align: 'center',
    })
}

function slide10Enrichment() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 5: Script Enrichment Details', 'What convert_k6_tests.js adds beyond raw conversion')

    addBullets(slide, [
        'Origin filtering: keeps only first-party API traffic and removes static assets.',
        'Request de-duplication: unique method + URL sequence for cleaner scenarios.',
        'Auth correlation: sign-in group extracts token and reuses it as Bearer auth.',
        'Dynamic parameterization: userName and payload data correlated per virtual user.',
        'Data-driven load: users read from testData/users.csv via SharedArray.',
        'Realistic pacing: think time derived from HAR/OTLP timing gaps.',
        'Reporting and SLOs: thresholds + handleSummary for HTML and text outputs.',
    ])
}

function slide11Outputs() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 6: Generated Artifacts', 'What appears in reports/ after each run')

    addBullets(slide, [
        '<test>.har: canonical traffic file used for conversion.',
        '<test>.k6firstversion.js: raw script from har-to-k6.',
        '<test>.k6updatedversion.js: enriched, production-like k6 script.',
        '<test>.summary.html and <test>.summary.txt: load test report outputs.',
        '<test>.otlp.json and <test>.otlp.k6.js: OTLP conversion path artifacts.',
        '<test>.otlp.summary.html and <test>.otlp.summary.txt: OTLP run results.',
    ])

    slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: 5.5,
        w: 12,
        h: 0.9,
        rectRadius: 0.08,
        fill: { color: colors.lightAccent },
        line: { color: '93C5FD', pt: 1 },
    })

    slide.addText('Pipeline automatically opens generated HTML report(s) in browser at the end.', {
        x: 1.0,
        y: 5.82,
        w: 11.6,
        h: 0.3,
        fontSize: 13,
        bold: true,
        color: colors.title,
        align: 'center',
    })
}

function slide12HowToPresent() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Step 7: Demo Flow for Presentation', 'Suggested live demo sequence')

    addBullets(slide, [
        '1. Show README prerequisites and run command.',
        '2. Execute npm run pipeline in terminal.',
        '3. Show generated files in reports/ (HAR, k6 scripts, summaries).',
        '4. Open HTML summary and explain key metrics (latency, pass/fail thresholds).',
        '5. Highlight OTLP-derived outputs to demonstrate source-agnostic capability.',
        '6. Explain how users.csv and correlation increase realism over static scripts.',
    ])
}

function slide13BusinessValue() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Business Value and Outcomes', 'From the UseCase perspective')

    addBullets(slide, [
        'Reduces manual scripting effort by auto-generating executable performance tests.',
        'Improves test realism by basing load models on captured production-like traffic.',
        'Accelerates feedback loops for scalability and resilience validation.',
        'Supports both functional journey replay (HAR) and observability ingestion (OTLP).',
        'Creates consistent reporting artifacts that are presentation-ready for stakeholders.',
    ])
}

function slide14Roadmap() {
    const slide = pptx.addSlide()
    addBackground(slide)
    addTitle(slide, 'Enhancement Roadmap', 'Potential next iterations')

    addBullets(slide, [
        'Add request clustering and auto-journey segmentation directly from raw logs.',
        'Expand output targets for JMeter and Gatling generators.',
        'Introduce CI/CD integration for scheduled or PR-based performance checks.',
        'Add SLA dashboards that compare current run vs baseline runs.',
        'Enrich correlation support for complex multi-step tokens and IDs.',
    ])
}

function slide15Closing() {
    const slide = pptx.addSlide()
    addBackground(slide)

    slide.addShape(pptx.ShapeType.roundRect, {
        x: 1.1,
        y: 1.7,
        w: 11.1,
        h: 3.4,
        rectRadius: 0.12,
        fill: { color: colors.white },
        line: { color: 'BFDBFE', pt: 1 },
    })

    slide.addText('Thank You', {
        x: 1.5,
        y: 2.35,
        w: 10.3,
        h: 0.7,
        fontFace: 'Aptos Display',
        fontSize: 44,
        bold: true,
        color: colors.title,
        align: 'center',
    })

    slide.addText('Traffic2Test framework is ready for walkthrough and demo.', {
        x: 1.5,
        y: 3.2,
        w: 10.3,
        h: 0.4,
        fontSize: 16,
        color: colors.muted,
        align: 'center',
    })

    slide.addText('Command: npm run pipeline', {
        x: 1.5,
        y: 3.75,
        w: 10.3,
        h: 0.35,
        fontFace: 'Consolas',
        fontSize: 18,
        color: colors.ok,
        bold: true,
        align: 'center',
    })
}

async function main() {
    slide1Title()
    slide2Agenda()
    slide3UseCase()
    slide4Architecture()
    slide5RepoMap()
    slide6PrereqSetup()
    slide7ExecutionEntry()
    slide8PipelineCore()
    slide9OtlpPath()
    slide10Enrichment()
    slide11Outputs()
    slide12HowToPresent()
    slide13BusinessValue()
    slide14Roadmap()
    slide15Closing()

    await pptx.writeFile({ fileName: OUTPUT })
    // eslint-disable-next-line no-console
    console.log(`PowerPoint created at: ${OUTPUT}`)
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`Failed to generate deck: ${err.message}`)
    process.exit(1)
})
