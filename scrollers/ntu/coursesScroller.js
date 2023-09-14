const fs = require("fs");
const puppeteer = require("puppeteer");

async function getScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.ntu.ac.uk/study-and-courses/courses/find-your-course"
  );
  // await page.screenshot({ path: "example.png", fullPage: true });
  // await page.pdf({ path: "example.pdf", format: "A4" });
  // const content = await page.content();
  // console.log(content);
  // const title = await page.evaluate(() => document.title);
  // const alltext = await page.evaluate(() => document.body.innerText);
  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (e) => e.href)
  // );
  // const headers = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("h2"), (e) => e.innerText)
  // );
  const courses = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".listing .result"), (e) => ({
      title: e.querySelector(".listing-details h2").innerText,
      link: e.querySelector(".listing-details a").href,
      courseLevel: e.querySelector(".listing-details span").innerText,
      courseType: e.querySelector(".listing-details strong").innerText,
    }))
  );

  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED");
  });
  await browser.close();
}

module.exports = getScreenshot;
