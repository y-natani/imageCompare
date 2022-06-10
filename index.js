// @ts-check
const puppeteer = require('puppeteer');
const { actualDomain, expectDomain, files } = require('./env');
const { makeFileName, delay, autoScroll } = require('./helpers');

const errorPages = []

const takeScreenshot = async (url, imageFileName) => {
  console.log(`taking screenshot... ${url}`)
  let browser, page;
  try{
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForTimeout(10000);
    await page.goto(url, { waitUntil: ['networkidle2'] });
    await autoScroll(page);
    await page.screenshot({path: imageFileName, fullPage:true});
  }catch{
    console.log("Error in", url)
    errorPages.push(url)
  }finally{
    if(browser){
      await browser.close()
    }
  }
}

(async () => {
  console.log(`開始時刻`, new Date().toString())
  for(const url of files){
    console.log(`進捗: ${files.indexOf(url)} / ${files.length}`)
    if(errorPages.length){
      console.log('errorPage', errorPages)
    }
    await takeScreenshot(`${actualDomain.domain}/${url}`,`actual/${makeFileName(url)}`);
    await takeScreenshot(`${expectDomain.domain}/${url}`, `expected/${makeFileName(url)}`);
  }
})();
