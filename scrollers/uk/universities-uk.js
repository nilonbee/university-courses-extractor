// const fs = require("fs");
// const puppeteer = require("puppeteer");
// const scrapeSingleContent = require("./singleCourse");

// async function scrapeUniversities() {
//   const browser = await puppeteer.launch({
//     protocolTimeout: 1500000, // Set the protocolTimeout to a higher value (in milliseconds)
//     // Other launch options...
//   });
//   const page = await browser.newPage();
//   const url =
//     "https://www.hotcoursesabroad.com/study/uk/international/schools-colleges-university/210/list.html";
//   await page.goto(url);

//   // Wait for the container element to load
//   await page.waitForSelector("div.container.ef_lcnt");

//   // Extract university data
//   const universities = await page.evaluate(() => {
//     const universityElements = Array.from(
//       document.querySelectorAll(
//         "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
//       )
//     );

//     const universitiesData = universityElements.map((universityElement) => {
//       const linkElement = universityElement.getAttribute("href");
//       const link = linkElement;

//       return link;
//     });

//     return universitiesData;
//   });

//   const data = [];

//   for (const universityLink of universities) {
//     await page.goto(universityLink, { waitUntil: "domcontentloaded" });
//     const streamData = [];

//     const streamLinks = await page.$$eval(
//       "section#popSubjectPod a.card_pod",
//       (links) => links.map((link) => link.href)
//     );
// //

//     for (const streamLink of streamLinks) {
//       const streamPage = await browser.newPage();

//       await streamPage.goto(streamLink, { waitUntil: "domcontentloaded" });
//       await streamPage.waitForSelector(".col-left");

//       const courseLinks = await streamPage.$$eval('a[id="cdLink"]', (links) =>
//         links.map((link) => link.href)
//       );

//       const streamData = [];

//       // for (const courseLink of courseLinks) {
//       //   async () => {
//       //     const courseData = await scrapeSingleContent(courseLink, browser);
//       //     streamData.push(courseData);
//       //   };
//       // }

//       streamData.push({
//         streamLink: streamLink,
//         courseLinks: courseLinks,
//       });

//       // await streamPage.close();
//     }

//     // ... (rest of the code)

//     data.push({
//       uni: universityLink,
//       streams: streamData,
//     });
//   }

//   console.log("University Data:", data);

//   fs.writeFile("universities.json", JSON.stringify(data), (err) => {
//     if (err) throw err;
//     console.log("FILE_SAVED");
//   });
//   await browser.close();
// }

// module.exports = scrapeUniversities;
// const fs = require("fs");
// const puppeteer = require("puppeteer");

// async function scrapeUniversities() {
//   const browser = await puppeteer.launch({
//     protocolTimeout: 300000, // Set the protocolTimeout to a higher value (in milliseconds)
//     // Other launch options...
//   });
//   const page = await browser.newPage();
//   const url =
//     "https://www.hotcoursesabroad.com/study/uk/international/schools-colleges-university/210/list.html";
//   await page.goto(url);

//   // Wait for the container element to load
//   await page.waitForSelector("div.container.ef_lcnt");

//   // Extract university data
//   const universities = await page.evaluate(() => {
//     const universityElements = Array.from(
//       document.querySelectorAll(
//         "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
//       )
//     );

//     const universitiesData = universityElements.map((universityElement) => {
//       const linkElement = universityElement.getAttribute("href");
//       return linkElement;
//     });

//     return universitiesData;
//   });

//   const data = [];

//   async function scrapeSingleContent(link) {
//     const page = await browser.newPage();
//     await page.goto(link, { waitUntil: "domcontentloaded" });

//     const courseData = await page.evaluate(() => {
//       const scrapedData = {
//         title: "",
//       };
//       // title section
//       const titleSection = document
//         .querySelector("#crs_det")
//         .textContent.trim();
//       scrapedData.title = titleSection
//         ? titleSection
//         : "have not been scraped title";

//       return scrapedData;
//     });

//     await page.close();
//     return courseData;
//   }

//   for (const universityLink of universities) {
//     await page.goto(universityLink, { waitUntil: "domcontentloaded" });
//     const streamData = [];

//     const streamLinks = await page.$$eval(
//       "section#popSubjectPod a.card_pod",
//       (links) => links.map((link) => link.href)
//     );

//     for (const streamLink of streamLinks) {
//       const courseLinks = await scrapeSingleContent(streamLink);
//       streamData.push({
//         streamLink: streamLink,
//         courseLinks: courseLinks,
//       });
//     }

//     data.push({
//       uni: universityLink,
//       streams: streamData,
//     });
//   }

//   console.log("University Data:", data);

//   fs.writeFile("universities.json", JSON.stringify(data), (err) => {
//     if (err) throw err;
//     console.log("FILE_SAVED");
//   });

//   await browser.close();
// }

// module.exports = scrapeUniversities;
const fs = require("fs");
const puppeteer = require("puppeteer");

async function scrapeUniversities() {
  const browser = await puppeteer.launch({
    // Other launch options...
  });

  const page = await browser.newPage();
  const url =
    "https://www.hotcoursesabroad.com/study/uk/international/schools-colleges-university/210/list.html";

  // Set navigation timeout for the main page
  await page.setDefaultNavigationTimeout(0); // Set to 0 for no timeout

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Wait for the container element to load
  await page.waitForSelector("div.container.ef_lcnt");

  // Extract university data
  const universities = await page.evaluate(() => {
    const universityElements = Array.from(
      document.querySelectorAll(
        "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
      )
    );

    const universitiesData = universityElements.map((universityElement) => {
      const linkElement = universityElement.getAttribute("href");
      return linkElement;
    });

    return universitiesData;
  });

  const data = [];

  async function scrapeSingleContent(link) {
    const subpage = await browser.newPage();

    // Set navigation timeout for subpages
    // await subpage.setDefaultNavigationTimeout(1000); // Set to 0 for no timeout

    await subpage.goto(link, { waitUntil: "domcontentloaded" });
    // await subpage.waitForSelector("div .fs_rgt");

    const courseData = await subpage.evaluate(() => {
      const scrapedData = {
        title: "",
        // whatWillLearn: "",
        // whyStudy: [],
        // careerProspects: "",
        // department: "",
        // tuition: {
        //   fee: "",
        //   checkwithUniversityUrl: "",
        // },
        // startDate: "",
        // venue: "",
        // entryRequirements: "",
      };
      // title section
      const titleSection = document
        .querySelector("#crs_det")
        .textContent.trim();
      scrapedData.title = titleSection
        ? titleSection
        : "have not been scraped title";

      // Extract data from the "What will I learn?" section
      // const whatWillLearnSection = document.querySelector("#what-will-i-learn");
      // if (whatWillLearnSection) {
      //   scrapedData.whatWillLearn = whatWillLearnSection
      //     .querySelector("h2")
      //     .textContent.trim();

      //   const whyStudyList = Array.from(
      //     whatWillLearnSection.querySelectorAll("ul li")
      //   );
      //   whyStudyList.forEach((item) => {
      //     scrapedData.whyStudy.push(item.textContent.trim());
      //   });

      //   const paragraphs = Array.from(
      //     whatWillLearnSection.querySelectorAll("p")
      //   );
      //   for (const paragraph of paragraphs) {
      //     if (paragraph.textContent.includes("CAREER PROSPECTS")) {
      //       scrapedData.careerProspects = paragraph.textContent.trim();
      //       break;
      //     }
      //   }
      // }

      // Extract data from the "Which department am I in?" section
      // const departmentSection = document.querySelector(
      //   "#Which-department-am-i-in"
      // );
      // if (departmentSection) {
      //   scrapedData.department = departmentSection
      //     .querySelector(".cd_para.oview")
      //     .textContent.trim();
      // }

      // // Extract tuition fees
      // const tuitionFeesSection = document.querySelector("div.tut_fs.eu");
      // if (tuitionFeesSection) {
      //   const tuitionFeeElement =
      //     tuitionFeesSection.querySelector("div.col1.bld");
      //   if (
      //     tuitionFeeElement &&
      //     tuitionFeeElement.textContent.trim() === "Tuition fees"
      //   ) {
      //     const feeInfoElement = tuitionFeesSection.querySelector("div.fs_rgt");
      //     if (feeInfoElement) {
      //       scrapedData.tuition.fee = feeInfoElement
      //         .querySelector("div.rat_nw")
      //         .textContent.trim();
      //       const checkWithInstAnchor = feeInfoElement.querySelector(
      //         'a[id="checkWithInstId"]'
      //       );
      //       if (checkWithInstAnchor) {
      //         scrapedData.tuition.checkWithUniversityUrl =
      //           checkWithInstAnchor.getAttribute("href");
      //       }
      //     }
      //   }
      // }

      // Extract Start Date
      // const startDateElement = document.querySelector(
      //   "div.tut_fs i.fa-calendar + div.fs_rgt p.ar_date"
      // );
      // if (startDateElement) {
      //   scrapedData.startDate = startDateElement.textContent.trim();
      // }

      // Extract Venue
      // const venueElement = document.querySelector(
      //   "div.tut_fs i.fa-map-marker + div.fs_rgt p"
      // );
      // if (venueElement) {
      //   scrapedData.venue = venueElement.textContent.trim();
      // }

      // Extract Entry Requirements
      // const entryRequirementsElement = document.querySelector(".cd_para.oview");
      // if (entryRequirementsElement) {
      //   scrapedData.entryRequirements =
      //     entryRequirementsElement.textContent.trim();
      // }

      return scrapedData;
    });

    await subpage.close();
    return courseData;
  }

  for (const universityLink of universities) {
    await page.goto(universityLink, { waitUntil: "domcontentloaded" });
    const streamData = [];

    const streamLinks = await page.$$eval(
      "section#popSubjectPod a.card_pod",
      (links) => links.map((link) => link.href)
    );

    for (const streamLink of streamLinks) {
      const courseData = await scrapeSingleContent(streamLink);
      streamData.push({
        streamLink: streamLink,
        courseData: courseData,
      });
    }

    data.push({
      uni: universityLink,
      streams: streamData,
    });
  }

  console.log("University Data:", data);

  fs.writeFile("universities.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED");
  });

  await browser.close();
}

module.exports = scrapeUniversities;

// const fs = require("fs");
// const puppeteer = require("puppeteer");
// async function scrapeSingleContent(page, link) {
//   await page.goto(link, { waitUntil: "domcontentloaded" });

//   const courseData = await page.evaluate(() => {
//     const scrapedData = {
//       // title: "",
//       html: {},
//     };
//     const tbContnerElement = document.querySelector("div.tb_contner");
//     if (tbContnerElement) {
//       scrapedData.html = tbContnerElement.innerHTML;
//     } else {
//       scrapedData.html = ""; // Handle the case where the element is not found
//     }
//     console.log("scraped", scrapedData);
//     return scrapedData;
//   });

//   return courseData;
// }

// async function scrapeUniversities() {
//   const browser = await puppeteer.launch({
//     // Other launch options...
//   });

//   const page = await browser.newPage();
//   const url =
//     "https://www.hotcoursesabroad.com/study/uk/international/schools-colleges-university/210/list.html";

//   await page.setDefaultNavigationTimeout(0); // Set to 0 for no timeout
//   await page.goto(url, { waitUntil: "domcontentloaded" });
//   await page.waitForSelector("div.container.ef_lcnt");

//   const universities = await page.evaluate(() => {
//     const universityElements = Array.from(
//       document.querySelectorAll(
//         "div.container.ef_lcnt > div.flud > div.sr_set > a.pr_rslt"
//       )
//     );
//     const universitiesData = universityElements.map((universityElement) =>
//       universityElement.getAttribute("href")
//     );
//     return universitiesData;
//   });

//   const data = [];

//   for (const universityLink of universities) {
//     const streamData = [];
//     await page.goto(universityLink, { waitUntil: "domcontentloaded" });

//     const streamLinks = await page.$$eval(
//       "section#popSubjectPod a.card_pod",
//       (links) => links.map((link) => link.href)
//     );

//     for (const streamLink of streamLinks) {
//       const courseData = await scrapeSingleContent(page, streamLink);
//       streamData.push({
//         streamLink: streamLink,
//         courseData: courseData,
//       });
//     }

//     data.push({
//       uni: universityLink,
//       streams: streamData,
//     });
//   }

//   console.log("University Data:", data);

//   fs.writeFile("universities.json", JSON.stringify(data), (err) => {
//     if (err) throw err;
//     console.log("FILE_SAVED");
//   });

//   await browser.close();
// }

// module.exports = scrapeUniversities;
