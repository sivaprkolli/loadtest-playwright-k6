# Feuji Hackathon Automation Pipeline

This project automates the process of:
- Running Playwright tests
- Capturing HAR files
- Ingesting traffic from app logs, API gateway logs, OpenTelemetry, and observability exports
- Converting HAR to k6 scripts
- Enriching k6 scripts
- Running k6 load tests
- Generating and opening HTML/text reports

## Folder Structure

- `utilities/` — Conversion scripts (`convert-k6.js`, `convert_k6_tests.js`, `har-to-otlp.js`, `otlp-to-k6.js`)
- `reports/` — All generated artifacts and reports, including HAR files, k6 scripts, and summaries
- `testData/` — Contains test data files like `users.csv`
- `tests/` — Playwright test specs
- `test-results/` — Stores results of test runs

## Prerequisites

- Node.js (v22+ recommended)
- Playwright (`npm install` will install dev dependencies)
- k6 (install via `npm run install:k6`)
- har-to-k6 (`npm install -g har-to-k6`)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Install k6 (if not already):
   ```sh
   npm run install:k6
   ```
3. Install har-to-k6 globally (if not already):
   ```sh
   npm install -g har-to-k6
   ```

## Usage

### Full Automation Pipeline

Run the entire workflow with:
```sh
npm run pipeline
# or
node run-pipeline.js
```

### What the Pipeline Does

1. **Cleanup**: Deletes previous HAR, k6 scripts, and reports from `reports/`.
2. **Ingest Traffic or Run Playwright Tests**:
   - If `INGEST_*` variables are set, traffic is ingested from provided exports and converted to HAR.
   - Otherwise, Playwright tests in `tests/` run and generate HAR.
3. **Convert HAR to k6**: Uses `har-to-k6` to create a raw k6 script from the HAR.
4. **Enrich k6 Script**: Uses `utilities/convert-k6.js` to add reporting and thresholds.
5. **Run k6 Load Test**: Executes the enriched k6 script and generates `summary.html` and `summary.txt` in `reports/`.
6. **Open Report**: Automatically opens the HTML report in your default browser.

### Output

- All generated files are in the `reports/` folder:
  - `addProductAndCheckout.har` — HAR file from Playwright
  - `addProductAndCheckout.k6updatedversion.js` — Enriched k6 script
  - `addProductAndCheckout.summary.html` — HTML report (auto-opens)
  - `addProductAndCheckout.summary.txt` — Text summary

## Customization
- Edit Playwright tests in `tests/` as needed.
- Conversion logic can be modified in `utilities/convert_k6_tests.js`.
- Additional utilities like `har-to-otlp.js` and `otlp-to-k6.js` can be used for advanced traffic conversion workflows.

## Troubleshooting
- If k6 fails with a non-zero exit code, check `reports/summary.txt` for details.
- Ensure all dependencies are installed and available in your PATH.

---
