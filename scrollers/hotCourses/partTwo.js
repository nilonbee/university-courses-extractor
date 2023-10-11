const puppeteer = require("puppeteer");
const fs = require("fs");
const universitiesUk = require("../../universities/universities-uk.json");
const universitiesCan = require("../../universities/universities-can.json");
const universitiesAus = require("../../universities/universities-aus.json");
// const universitiesTest = require("../../universities/universities.json");

async function scrapeUniversitiesPartTwo(universities) {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  const data = [];
  // const universities = universitiesTest;

  for (const universityLink of universities) {
    let acceptedCookieBanner = false;
    await page.goto(universityLink, { waitUntil: "domcontentloaded" });

    const streamLinks = await page.$$eval(
      "section#popSubjectPod a.card_pod",
      (links) => links.map((link) => link.getAttribute("href"))
    );

    for (const streamLink of streamLinks) {
      await page.goto(streamLink, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(3000);

      // Cookie banner handling
      while (true) {
        // Handle the cookie consent banner on the first page
        // await page.waitForSelector(
        //   "#onetrust-banner-sdk button#onetrust-accept-btn-handler",
        //   { visible: true }
        // );
        const cookieBanner = await page.$(
          "#onetrust-banner-sdk button#onetrust-accept-btn-handler"
        );
        if (cookieBanner) {
          await cookieBanner.click();
          acceptedCookieBanner = true;
          // Wait for a short time to allow any potential page changes
          await page.waitForTimeout(3000);
        }

        // ----cookie------
        const courseLinks = await page.$$eval("div.col-left a", (anchors) => {
          return anchors.map((anchor) => anchor.href);
        });

        const trueLinks = courseLinks.filter((link) =>
          link.startsWith("https://")
        );

        // Push course links directly into data for each stream
        data.push(trueLinks);

        console.log("courseLinks", trueLinks);
        break; // Exit the cookie banner loop
      }
    }
  }

  console.log("University Data:", data);

  fs.writeFile("courses/courses.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED");
  });

  await browser.close();
}

module.exports = scrapeUniversitiesPartTwo;
