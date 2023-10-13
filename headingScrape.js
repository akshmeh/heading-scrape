import puppeteer from "puppeteer";

export default async function headingScrape(urls) {
    const browser = await puppeteer.launch({ headless: false });
    
    for (let index = 0; index < 5; index++) {
        const url = urls[index];
        exacuteHeadingScrape(url,browser);
    
}
await browser.close();
}

async function exacuteHeadingScrape(url,browser){
    
        const page = await browser.newPage();
        
    
   
    await page.goto(url);
   
    const h1s = await page.$$('h1');
    const h2s = await page.$$('h2');
    const h3s = await page.$$('h3');
    const h4s = await page.$$('h4');
    const h5s = await page.$$('h5');
    const h6s = await page.$$('h6');
   
    const headings = h1s.concat(h2s, h3s, h4s,h5s,h6s);
   
    for (const heading of headings) {
        const headingType = await heading.evaluate(node=> node.tagName);
      const text = await heading.evaluate(node => node.textContent);
      console.log(url, headingType,text);
    }
}