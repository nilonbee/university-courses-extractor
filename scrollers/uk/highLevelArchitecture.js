const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Step 1: Navigate to the main page listing universities
  await page.goto(
    "https://www.hotcoursesabroad.com/study/uk/international/schools-colleges-university/210/list.html"
  );
  // Wait for the selector
  await page.waitForSelector("div.container.ef_lcnt");


  // extract university data
  const universities = await page.evaluate(() => {
    const universityElements = Array.from(
      document.querySelectorAll(
        "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
      )
    );

    const universitiesData = universityElements.map((universityElement) => {
      const linkElement = universityElement.getAttribute("href");
      const link = linkElement;

      return link;
    });

    return universitiesData;
  });

  // Iterate through universities
  for (const universityLink of universities) {
    // Step 3: Navigate to the university's page
    await page.goto(universityLink, { waitUntil: "domcontentloaded" });

    // Step 4: Get a list of stream links
    const streamLinks = await page.$$eval(".slick-track > .mgal_col .slick-slide .slick-cloned > a", (links) =>
      links.map((link) => link.href)
    );

    // Iterate through streams
    for (const streamLink of streamLinks) {
      // Step 5: Navigate to the stream's page
      await page.goto(streamLink);

      // Step 6: Get a list of course links
      const courseLinks = await page.$$eval("a.course-link", (links) =>
        links.map((link) => link.href)
      );

      // Iterate through courses
      for (const courseLink of courseLinks) {
        // Step 7: Navigate to the course's view page
        await page.goto(courseLink);

        // Step 8: Scrape course data
        const courseData = await page.evaluate(() => {
          // Extract course details, prerequisites, etc.
          // Return an object containing the scraped data
          return {
            courseName: document.querySelector("h1").textContent,
            description: document.querySelector(".description").textContent,
            // Add more data points as needed
          };
        });

        // Step 9: Store course data (you can use a database or save to a file)
        console.log(courseData);

        // Optional: Sleep to avoid overloading the server
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Step 10: Handle pagination if necessary
      // You may need to implement logic to navigate through multiple pages of courses
    }

    // Optional: Sleep to avoid overloading the server
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  await browser.close();
})();
