// let's keep this file as a refference

// const fs = require("fs");
// const puppeteer = require("puppeteer");

// async function scrapeSingleContent() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(
//     "https://www.hotcoursesabroad.com/study/course/uk/aeronautical-engineering-beng-hons/54940158/program.html"
//   );
//   // await page.goto(
//   //   "https://www.hotcoursesabroad.com/study/course/uk/biotechnology-and-management-msc-pgdip/56836662/program.html"
//   // );

//   const data = await page.evaluate(() => {
//     const scrapedData = {
//       title: "",
//       whatWillLearn: "",
//       whyStudy: [],
//       careerProspects: "",
//       department: "",
//       tuition: {
//         fee: "",
//         checkwithUniversityUrl: "",
//       },
//       startDate: "",
//       venue: "",
//       entryRequirements: "",
//     };
//     // title section
//     const titleSection = document.querySelector("#crs_det").textContent.trim();
//     scrapedData.title = titleSection
//       ? titleSection
//       : "have not been scraped title";

//     // Extract data from the "What will I learn?" section
//     // const whatWillLearnSection = document.querySelector("#what-will-i-learn");
//     // if (whatWillLearnSection) {
//     //   scrapedData.whatWillLearn = whatWillLearnSection
//     //     .querySelector("h2")
//     //     .textContent.trim();

//     //   const whyStudyList = Array.from(
//     //     whatWillLearnSection.querySelectorAll("ul li")
//     //   );
//     //   whyStudyList.forEach((item) => {
//     //     scrapedData.whyStudy.push(item.textContent.trim());
//     //   });

//     //   const paragraphs = Array.from(whatWillLearnSection.querySelectorAll("p"));
//     //   for (const paragraph of paragraphs) {
//     //     if (paragraph.textContent.includes("CAREER PROSPECTS")) {
//     //       scrapedData.careerProspects = paragraph.textContent.trim();
//     //       break;
//     //     }
//     //   }
//     // }
//     // const whatWillILearnSection = document
//     //   .querySelector(".cd_para .oview")
//     //   .textContent.trim();

//     // scrapedData.whatWillLearn = whatWillILearnSection
//     //   ? whatWillILearnSection
//     //   : "Learn or Depart";

//     // Extract data from the "Which department am I in?" section
//     const departmentSection = document.querySelector(
//       "#Which-department-am-i-in"
//     );
//     if (departmentSection) {
//       scrapedData.department = departmentSection
//         .querySelector(".cd_para.oview")
//         .textContent.trim();
//     }

//     // Extract tuition fees
//     const tuitionFeesSection = document.querySelector("div.tut_fs.eu");
//     if (tuitionFeesSection) {
//       const tuitionFeeElement =
//         tuitionFeesSection.querySelector("div.col1.bld");
//       if (
//         tuitionFeeElement &&
//         tuitionFeeElement.textContent.trim() === "Tuition fees"
//       ) {
//         const feeInfoElement = tuitionFeesSection.querySelector("div.fs_rgt");
//         if (feeInfoElement) {
//           scrapedData.tuition.fee = feeInfoElement
//             .querySelector("div.rat_nw")
//             .textContent.trim();
//           const checkWithInstAnchor = feeInfoElement.querySelector(
//             'a[id="checkWithInstId"]'
//           );
//           if (checkWithInstAnchor) {~
//             scrapedData.tuition.checkWithUniversityUrl
//               checkWithInstAnchor.getAttribute("href");
//           }
//         }
//       }
//     }

//     // Extract Start Date
//     // const startDateElement = document.querySelector(
//     //   "div.tut_fs i.fa-calendar + div.fs_rgt p.ar_date"
//     // );
//     // if (startDateElement) {
//     //   scrapedData.startDate = startDateElement.textContent.trim();
//     // }

//     // Extract Venue
//     // const venueElement = document.querySelector(
//     //   "div.tut_fs i.fa-map-marker + div.fs_rgt p"
//     // );
//     // if (venueElement) {
//     //   scrapedData.venue = venueElement.textContent.trim();
//     // }

//     // Extract Entry Requirements
//     const entryRequirementsElement = document.querySelector(".cd_para.oview");
//     if (entryRequirementsElement) {
//       scrapedData.entryRequirements =
//         entryRequirementsElement.textContent.trim();
//     }
//     console.log("scraped", scrapedData.whatWillLearn);
//     return scrapedData;
//   });

//   fs.writeFile("singleView.json", JSON.stringify(data), (err) => {
//     if (err) throw err;
//     console.log("FILE_SAVED");
//   });

//   console.log("singleCourse", data);

//   await browser.close();

//   return data;
// }

// module.exports = scrapeSingleContent;

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const axios = require("axios");

// // Function to transform HTML content to JSON using ChatGPT API
// async function transformHTMLToJSON(htmlContent) {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/engines/davinci-codex/completions",
//       {
//         prompt: `Transform the following HTML content to JSON format: ${htmlContent}`,
//         max_tokens: 100,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: "Bearer YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const jsonContent = response.data.choices[0].text.trim();
//     return JSON.parse(jsonContent);
//   } catch (error) {
//     console.error("An error occurred while transforming HTML to JSON:", error);
//     throw error;
//   }
// }

// // Function to scrape and transform content
// async function scrapeSingleContent() {
//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//     });
//     const page = await browser.newPage();

//     // Navigate to the target webpage
//     await page.goto(
//       "https://www.hotcoursesabroad.com/study/course/uk/aeronautical-engineering-beng-hons/54940158/program.html"
//     ); // Replace 'YOUR_URL_HERE' with the actual URL

//     // Wait for both elements to appear
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

//     // Use ChatGPT to transform HTML to JSON
//     const aboutThisCourseJSON = await transformHTMLToJSON(
//       aboutThisCourseContent
//     );
//     const studyOptionsJSON = await transformHTMLToJSON(studyOptionsContent);

//     // Combine the JSON results
//     const resultJSON = {
//       about: aboutThisCourseJSON,
//       courseDetails: studyOptionsJSON,
//     };

//     // Save the JSON to a file
//     fs.writeFile(
//       "scrapedData.json",
//       JSON.stringify(resultJSON, null, 2),
//       (err) => {
//         if (err) throw err;
//         console.log("Data saved to scrapedData.json");
//       }
//     );
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// // Call the function to start the scraping and saving process
// // scrapeAndTransformContent();

// module.exports = scrapeSingleContent;
