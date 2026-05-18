import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://jaroche.eltonyo.site";
const OUT_DIR = path.resolve(__dirname, "../src/assets/jaroche");

const candidatePaths = {
  landing: ["/"],
  shop: ["/shop", "/products", "/collection", "/store"],
  about: ["/about", "/about-us", "/story"],
  cart: ["/cart", "/checkout"],
};

const findRealPath = async (page, candidates) => {
  for (const p of candidates) {
    const url = SITE + p;
    const resp = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const status = resp?.status() ?? 0;
    if (status >= 200 && status < 400) {
      const looks404 = await page
        .locator("text=/404|not found|page not found/i")
        .first()
        .isVisible()
        .catch(() => false);
      if (!looks404) return p;
    }
  }
  return null;
};

const run = async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const summary = [];

  for (const [name, candidates] of Object.entries(candidatePaths)) {
    const page = await context.newPage();
    const realPath = await findRealPath(page, candidates);
    if (!realPath) {
      summary.push({ name, ok: false, reason: "no matching route" });
      await page.close();
      continue;
    }

    try {
      await page.goto(SITE + realPath, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
    } catch {
      // networkidle may stall on long-polling sites; fall back
      await page.goto(SITE + realPath, { waitUntil: "load", timeout: 45000 });
    }

    // Let fonts + animations settle
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1500);

    // Dismiss anything sticky like cookie banners by clicking common accept buttons
    for (const sel of [
      'button:has-text("Accept")',
      'button:has-text("Agree")',
      'button:has-text("Got it")',
      'button:has-text("Close")',
    ]) {
      const btn = page.locator(sel).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {});
      }
    }

    const outPath = path.join(OUT_DIR, `jaroche-${name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    summary.push({ name, ok: true, route: realPath, file: outPath });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
