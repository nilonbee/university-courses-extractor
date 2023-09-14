const fs = require("fs");
const puppeteer = require("puppeteer");

async function getScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page with the HTML content
  await page.goto(
    "https://study.unisa.edu.au/aboriginal-and-australian-studies"
  );

  // Wait for the table to load
  await page.waitForSelector(".tabs-content-header");

  // Extract the data from the table
  const data = await page.evaluate(() => {
    const tableRows = Array.from(document.querySelectorAll("tr.all-text16"));

    return tableRows.map((row) => {
      const columns = row.querySelectorAll("td");
      return {
        degreeIcon: columns[0].querySelector("svg").outerHTML,
        degreeTitle: columns[1].textContent.trim(),
        modeOfStudy: columns[2].textContent.trim(),
        startDate: columns[3].textContent.trim(),
        midyearEntry: columns[4].textContent.trim(),
      };
    });
  });

  console.log(data);

  fs.writeFile("courses.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED_UNISA");
  });
  await browser.close();
}

module.exports = getScreenshot;
