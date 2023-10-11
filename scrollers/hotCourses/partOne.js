const fs = require("fs");
const puppeteer = require("puppeteer");
const uni = require("../../universities/universities.json");
require("dotenv").config();

async function scrapeUniversities(baseUrl) {
  console.log("baseUrl", baseUrl);
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  // const baseUrl =
  //   process.env.UNIVERSITIES_CAN ||
  //   process.env.UNIVERSITIES_AUS ||
  //   process.env.UNIVERSITIES_UK;
  await page.setDefaultNavigationTimeout(18000); // Set to 0 for no timeout
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  const universityLinks = [];
  let acceptedCookieBanner = false;

  // ...
  while (true) {
    // Handle the cookie consent banner on the first page
    if (!acceptedCookieBanner) {
      await page.waitForSelector(
        "#onetrust-banner-sdk button#onetrust-accept-btn-handler",
        { visible: true }
      );
      const cookieBanner = await page.$(
        "#onetrust-banner-sdk button#onetrust-accept-btn-handler"
      );
      if (cookieBanner) {
        await cookieBanner.click();
        acceptedCookieBanner = true;
        // Wait for a short time to allow any potential page changes
        await page.waitForTimeout(3000);
      }
    }

    // Scroll down to trigger lazy-loaded content (adjust the value as needed)
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // const universitiesOnPage = await page.evaluate(() => {
    //   const universityElements = Array.from(
    //     document.querySelectorAll(
    //       "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
    //     )
    //   );
    //   const universitiesData = universityElements.map((universityElement) =>
    //     universityElement.getAttribute("href")
    //   );
    //   return universitiesData;
    // });
    const universitiesOnPage = await page.evaluate(() => {
      const universityElements = Array.from(
        document.querySelectorAll(
          "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
        )
      );

      const universitiesData = universityElements.map((universityElement) => {
        const href = universityElement.getAttribute("href");
        const name =
          universityElement.querySelector("div.sr_nam h2").textContent;
        const logoURL = universityElement
          .querySelector("div.pr_lgo img")
          .getAttribute("src");

        return {
          href,
          name,
          logoURL,
        };
      });

      return universitiesData;
    });

    universityLinks.push(...universitiesOnPage);

    // Use the new selector for the "Next page" button on the second page
    // const nextPageButton = await page.waitForSelector(
    //   '.nx_btn a[title="Next page"]'
    // );
    const nextPageButton = await page.$('.nx_btn a[title="Next page"]');
    if (!nextPageButton) {
      console.log("No next page is detected");
      break;
    }

    // Click the "Next page" button
    await nextPageButton.click();

    // Wait for a short time to allow the next page to load
    await page.waitForTimeout(8000); // Adjust the time as needed
  }

  // ...

  // ...

  console.log("Scraped university links:", universityLinks);

  // Save university links to a JSON file
  fs.writeFile(
    "universities/universities.json",
    JSON.stringify(universityLinks),
    (err) => {
      if (err) throw err;
      console.log("FILE_SAVED");
    }
  );

  await browser.close();
  return universityLinks;
}

module.exports = scrapeUniversities;
