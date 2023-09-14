const fs = require("fs");
const puppeteer = require("puppeteer");

async function scrapeHotCourses() {
  // Launch a headless Chromium browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto(
    "https://www.hotcoursesabroad.com/study/degrees/uk/health-and-medicine-courses-at-king-s-college-london-university-of-london/loc/210/cgory/h-2/sin/ct/cid/4574/programs.html"
  );

  // Extract links from anchor tags with id="cdLink"
  const courseLinks = await page.evaluate(() => {
    const links = [];
    const anchorElements = document.querySelectorAll('a[id="cdLink"]');

    anchorElements.forEach((anchor) => {
      links.push(anchor.href);
    });

    return links;
  });

  // Print the extracted links
  console.log(courseLinks);

  // Close the browser
  await browser.close();
}

module.exports = scrapeHotCourses;
