import puppeteer from "puppeteer";

export default async function Capitalization(data) {
 const browser = await puppeteer.launch({ headless: false });
 const page = await browser.newPage();

 await page.goto("https://capitalizemytitle.com/");
 await page.type("#inputbox textarea", data);
 await page.click("#titlecase");

 const resultData = await page.$eval(
    "#inputbox textarea",
    (textarea) => textarea.value
 );

 console.log(resultData);

 await browser.close();
}