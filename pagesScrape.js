import puppeteer from "puppeteer";
// import headingScrape from "./headingScrape.js";
import headingCluster from "./headingCluster.js"

export default async function pagesScrape(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    var hrefData = [];
    await page.goto(url);

    // Get all the subpages of the url
    const subpages = await page.$$('a');
    for (const subpage of subpages) {
        const href = await subpage.evaluate(node => node.href);
        if (href.startsWith(url)) {
            hrefData.push(href);
        }
    }
    console.log(hrefData)
    await browser.close();
   
    const uniqueHrefData = [...new Set(hrefData)];
    headingCluster(uniqueHrefData)
}