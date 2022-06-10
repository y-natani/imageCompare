// @ts-check
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  const url = ''
  await page.waitForTimeout(10000);
  await page.goto(url, { waitUntil: 'load' });
  await page.screenshot({path: 'capture.png', fullPage:true})
  await browser.close()
})();