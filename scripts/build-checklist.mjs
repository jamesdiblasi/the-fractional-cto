/**
 * Renders scripts/checklist.html to public/cto-readiness-checklist.pdf using
 * a headless Chromium. Run with `npm run checklist:pdf` after editing the HTML.
 *
 * Uses playwright-core so no browser is downloaded on install. Set
 * CHROMIUM_PATH if the default locations do not match your machine.
 */
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, 'checklist.html');
const output = resolve(here, '..', 'public', 'cto-readiness-checklist.pdf');

const candidates = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error('No Chromium found. Set CHROMIUM_PATH to a Chrome or Chromium binary.');
  process.exit(1);
}

const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' });
  // The document sets Figtree and Instrument Serif from Google Fonts. Without
  // waiting the PDF can render in the fallback stack instead.
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Wrote ${output}`);
} finally {
  await browser.close();
}
