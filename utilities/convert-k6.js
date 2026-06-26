#!/usr/bin/env node

// Thin CLI alias for the HAR-derived k6 converter.
// convert_k6_tests.js only auto-runs when invoked directly, so call its main().
const { main } = require('./convert_k6_tests.js')

try {
    main()
} catch (err) {
    console.error(`Conversion failed: ${err.message}`)
    process.exit(1)
}
