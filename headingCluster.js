import { Cluster } from "puppeteer-cluster";

export default async function headingScrape(urls) {
    var jsonData = []
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
    });
  
    await cluster.task(async ({ page, data: url }) => {
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
        jsonData.push({
            url:url,
            headingType:headingType,
            headingText :text ,

        })
      }
    });
    
    
    // many more pages
    for (let index = 0; index <= urls.length; index++) {
        const url = urls[index];
        cluster.queue(url);
    }
    
    await cluster.idle();
    await cluster.close();
    console.log(jsonData);
};