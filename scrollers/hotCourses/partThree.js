// const fs = require("fs");
// const puppeteer = require("puppeteer");
// const courses = require("../../testingCourses.json");
// const axios = require("axios");
// const cheerio = require("cheerio"); // Import Cheerio

// // Function to transform HTML content to JSON using Cheerio
// function transformHTMLToJSON(htmlContent) {
//   const $ = cheerio.load(htmlContent);

//   // Select and extract data from HTML elements
//   const aboutHTML = $("#what-will-i-learn .cd_para").html();
//   const studyOptionsHTML = $("#Which-department-am-i-in .cd_para").html();

//   // Create JSON objects
//   const aboutJson = {
//     aboutHTML: aboutHTML || null,
//   };

//   const studyOptionsJson = {
//     studyOptionsHTML: studyOptionsHTML || null,
//   };

//   return { aboutJson, studyOptionsJson };
// }

// // Function to scrape and transform content for a single course link
// async function scrapeSingleCourse(courseLink) {
//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//     });
//     const page = await browser.newPage();

//     // Navigate to the course link
//     await page.goto(courseLink);
//     const cookieBanner = await page.$(
//       "#onetrust-banner-sdk button#onetrust-accept-btn-handler"
//     );

//     if (cookieBanner) {
//       await cookieBanner.click();
//       // Wait for a short time to allow any potential page changes
//       await page.waitForTimeout(4000);
//     }

//     // Wait for elements as needed for this specific page
//     await page.waitForSelector("#about-this-course");
//     await page.waitForSelector("#study-options");

//     // Extract the content of the 'about-this-course' element
//     const aboutThisCourseContent = await page.evaluate(() => {
//       const element = document.querySelector("#about-this-course");
//       return element ? element.innerHTML : null;
//     });

//     // Extract the content of the 'study-options' element
//     const studyOptionsContent = await page.evaluate(() => {
//       const element = document.querySelector("#study-options");
//       return element ? element.innerHTML : null;
//     });

//     await browser.close();

//     // Use Cheerio to transform HTML to JSON
//     const { aboutJson, studyOptionsJson } = transformHTMLToJSON(
//       aboutThisCourseContent,
//       studyOptionsContent
//     );
//     await page.waitForTimeout(4000);

//     // Combine the JSON results
//     return {
//       aboutHTML: aboutThisCourseContent,
//       studyOptionsHTML: studyOptionsContent,
//       aboutJson: aboutJson,
//       studyOptionsJson: studyOptionsJson,
//     };
//   } catch (error) {
//     console.error(`Error while scraping ${courseLink}:`, error);
//     return null; // Return null to indicate an error
//   }
// }

// // Function to scrape and save all course details in an array

// async function scrapeAllCourses() {
//   const scrapedDataArray = [];
//   const courseLinks = courses.flat();
//   for (const courseLink of courseLinks) {
//     const courseData = await scrapeSingleCourse(courseLink);
//     console.log("courseData", courseData);
//     if (courseData) {
//       scrapedDataArray.push(courseData);
//     }
//   }

//   // Save the scraped data as a JSON file
//   fs.writeFile(
//     "scrapedData.json",
//     JSON.stringify(scrapedDataArray, null, 2),
//     (err) => {
//       if (err) throw err;
//       console.log("All data saved to scrapedData.json");
//     }
//   );
// }

// module.exports = scrapeAllCourses;
//+++++++++++++++++++++++++++++++++++++++++++++++
// const fs = require("fs");
// const courses = require("../../testingCourses.json");
// const axios = require("axios");
// const cheerio = require("cheerio");

// // Function to scrape course details from HTML content
// function transformHTMLToJSON(courseHTML) {
//   const $ = cheerio.load(courseHTML);

//   const whatWillILearn = $("#what-will-i-learn .cd_para").text().trim();
//   const aboutThisCourse = $("#what-will-i-learn + section .cd_para")
//     .text()
//     .trim();
//   const department = $("#Which-department-am-i-in .cd_para").text().trim();

//   // Extract study options
//   const studyOptions = [];
//   $("#study-options .cs_opt").each((index, element) => {
//     const fullTime = $(element).find("h4").text().trim();
//     const tuitionFees = $(element).find(".fs_rgt .amt").text().trim();
//     const startDate = $(element).find(".fs_rgt p.ar_date").text().trim();
//     const venue = $(element).find(".fs_rgt p:contains('Venue')").text().trim();

//     studyOptions.push({ fullTime, tuitionFees, startDate, venue });
//   });

//   // Entry requirements
//   const entryRequirements = $("#entry-requirements .cd_para").text().trim();

//   const courseDetails = {
//     whatWillILearn,
//     aboutThisCourse,
//     department,
//     studyOptions,
//     entryRequirements,
//   };

//   return courseDetails;
// }

// // Function to scrape and save all course details in an array
// async function scrapeAllCourses() {
//   const scrapedDataArray = [];
//   const courseLinks = courses.flat();

//   for (const courseLink of courseLinks) {
//     try {
//       // Fetch HTML content from the courseLink
//       const { data: courseHTML } = await axios.get(courseLink);

//       // Parse HTML content with Cheerio
//       const courseData = transformHTMLToJSON(courseHTML);
//       console.log("courseData", courseData);

//       if (courseData) {
//         scrapedDataArray.push(courseData);
//       }
//     } catch (error) {
//       console.error(`Error while scraping ${courseLink}:`, error);
//     }
//   }

//   // Save the scraped data as a JSON file
//   fs.writeFile(
//     "scrapedData.json",
//     JSON.stringify(scrapedDataArray, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Error writing to scrapedData.json:", err);
//       } else {
//         console.log("All data saved to scrapedData.json");
//       }
//     }
//   );
// }

// module.exports = scrapeAllCourses;
//+++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++

const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const config = require("../../config.json"); // Import the configuration file
const { v4: uuidv4 } = require("uuid");
// const courses = require("../../courses/courses.json");

// Function to generate a unique hash code for a string
String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// Function to scrape course details from HTML content
function transformHTMLToJSON(courseHTML) {
  const courseId = uuidv4();
  const $ = cheerio.load(courseHTML);
  const courseTitle = $("#crs_det").text().trim();
  const universityTitle = $(".visit_an a").text().trim();
  const whatWillILearn = $("#what-will-i-learn .cd_para").text().trim();
  const aboutThisCourse = $("#what-will-i-learn + section .cd_para")
    .text()
    .trim();
  const department = $("#Which-department-am-i-in .cd_para").text().trim();

  // Extract study options
  const studyOptions = [];
  $("#study-options .cs_opt").each((index, element) => {
    const fullTime = $(element).find("h4").text().trim();
    const tuitionFeesText = $(element).find(".fs_rgt .rat_nw").text().trim();
    const tuitionFeesMatch = tuitionFeesText.match(/A\$([\d,]+(?:\.\d{2})?)/);

    // Check if there is a match before accessing the value
    const tuitionFees = tuitionFeesMatch
      ? tuitionFeesMatch[1]
      : "Not available"; // Use a default value if there's no match
    const startDate = $(element).find(".fs_rgt p.ar_date").text().trim();
    const venue = $(element).find(".fs_rgt p:contains('Venue')").text().trim();

    studyOptions.push({ fullTime, tuitionFees, startDate, venue });
  });

  const entryRequirements = $("#entry-requirements .cd_para").text().trim();

  const courseDetails = {
    id: courseId,
    courseTitle,
    universityTitle,
    whatWillILearn,
    aboutThisCourse,
    department,
    studyOptions,
    entryRequirements,
  };

  return courseDetails;
}

const maxRetries = 3; // Set the maximum number of retries

async function scrapeAllCourses(courses) {
  const scrapedDataArray = [];
  console.log("COURS#", courses);
  const courseLinks = courses.flat();
  const lastSavedIndex = config.lastSavedIndex || 0;

  for (let i = lastSavedIndex; i < courseLinks.length; i++) {
    let retryCount = 0;
    let courseData;

    while (retryCount < maxRetries) {
      try {
        const { data: courseHTML } = await axios.get(courseLinks[i]);
        courseData = transformHTMLToJSON(courseHTML);
        break; // If successful, break out of the retry loop
      } catch (error) {
        console.error(
          `Error while scraping ${courseLinks[i]} (Retry ${retryCount + 1}):`,
          error
        );
        retryCount++;
      }
    }

    if (courseData) {
      scrapedDataArray.push(courseData);
      console.log(`Data for course ${i + 1} scraped.`);
    }
  }

  // Write scraped data to a JSON file
  fs.writeFileSync(
    "scrapedData/scrapedTestData.json",
    JSON.stringify(scrapedDataArray, null, 2)
  );

  // Update the last saved index in the config file
  config.lastSavedIndex = 0; // Set lastSavedIndex to 0 after all courses have been scraped
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
}

module.exports = scrapeAllCourses;
