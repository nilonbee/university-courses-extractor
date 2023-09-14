const fs = require("fs");
const puppeteer = require("puppeteer");

async function getInfoUnisa() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace with the URL of the page containing the elements
  const url = "https://study.unisa.edu.au/";

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const courseElements = await page.$$("div a.button.columns.degree-cta");
  const unisa = {};
  const courses = [];

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".header-logo a img"), (e) => e.src)
  );

  courses.push(links);

  for (const element of courseElements) {
    const titleElement = await element.$("span.description.text16");
    const title = await (
      await titleElement.getProperty("textContent")
    ).jsonValue();

    const courseObject = {
      title: title,
    };

    courses.push(courseObject);
  }
  unisa["courses"] = courses;
  unisa["links"] = links;
  console.log("courses", unisa);

  fs.writeFile("information.json", JSON.stringify(unisa), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED");
  });

  await browser.close();
}

module.exports = getInfoUnisa;
