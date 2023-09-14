const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const baseURL = "https://example.com/university-courses";

  // Define a function to scrape data from a single view page
  async function scrapeCoursePage(courseUrl) {
    const coursePage = await browser.newPage();
    await coursePage.goto(courseUrl);

    // Extract data from the single view page (adjust selectors as needed)
    const courseData = await coursePage.evaluate(() => {
      const courseTitle = document.querySelector("h1.course-title").textContent;
      const courseDescription = document.querySelector(
        "div.course-description"
      ).textContent;
      // Add more data extraction here

      return {
        title: courseTitle,
        description: courseDescription,
        // Add more data fields
      };
    });

    await coursePage.close();
    return courseData;
  }

  // List of streams to scrape
  const streams = ["Health", "IT", "Art", "Engineering"];

  const allCourseData = [];

  for (const stream of streams) {
    await page.goto(`${baseURL}/${stream}`);

    // Pagination logic (modify as needed)
    let hasNextPage = true;
    while (hasNextPage) {
      const courseLinks = await page.$$eval("a.course-link", (links) =>
        links.map((link) => link.href)
      );

      for (const courseLink of courseLinks) {
        const courseData = await scrapeCoursePage(courseLink);
        allCourseData.push(courseData);
      }

      // Check if there's a next page (modify selector as needed)
      hasNextPage = await page.$("a.next-page");

      if (hasNextPage) {
        await page.click("a.next-page");
        await page.waitForNavigation();
      }
    }
  }

  // Close the browser when done
  await browser.close();

  // Process the collected course data as needed
  console.log(allCourseData);
})();
