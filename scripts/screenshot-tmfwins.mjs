import { chromium } from 'playwright';
import path from 'node:path';

const out = path.resolve(process.cwd(), 'public/projects/tmfwins-home.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.goto('https://www.tmfwins.com/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

await page.screenshot({ path: out, fullPage: false });

await browser.close();
console.log('Wrote:', out);
