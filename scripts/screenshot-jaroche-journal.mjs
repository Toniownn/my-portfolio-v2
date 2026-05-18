import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://jaroche.eltonyo.site";
const OUT = path.resolve(__dirname, "../src/assets/jaroche/jaroche-journal.png");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});
const page = await context.newPage();

const resp = await page.goto(`${SITE}/journal`, {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});
const status = resp?.status() ?? 0;
console.log("status", status);

await page.evaluate(() => document.fonts?.ready);
await page.waitForTimeout(1500);

await page.screenshot({ path: OUT, fullPage: false });
console.log("saved", OUT);

await browser.close();
