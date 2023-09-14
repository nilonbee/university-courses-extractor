const fs = require("fs");
const puppeteer = require("puppeteer");

async function scrapeSingleContent() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.hotcoursesabroad.com/study/course/uk/aeronautical-engineering-beng-hons/54940158/program.html"
  );
  // await page.goto(
  //   "https://www.hotcoursesabroad.com/study/course/uk/biotechnology-and-management-msc-pgdip/56836662/program.html"
  // );

  const data = await page.evaluate(() => {
    const scrapedData = {
      title: "",
      whatWillLearn: "",
      whyStudy: [],
      careerProspects: "",
      department: "",
      tuition: {
        fee: "",
        checkwithUniversityUrl: "",
      },
      startDate: "",
      venue: "",
      entryRequirements: "",
    };
    // title section
    const titleSection = document.querySelector("#crs_det").textContent.trim();
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

    //   const paragraphs = Array.from(whatWillLearnSection.querySelectorAll("p"));
    //   for (const paragraph of paragraphs) {
    //     if (paragraph.textContent.includes("CAREER PROSPECTS")) {
    //       scrapedData.careerProspects = paragraph.textContent.trim();
    //       break;
    //     }
    //   }
    // }
    // const whatWillILearnSection = document
    //   .querySelector(".cd_para .oview")
    //   .textContent.trim();

    // scrapedData.whatWillLearn = whatWillILearnSection
    //   ? whatWillILearnSection
    //   : "Learn or Depart";

    // Extract data from the "Which department am I in?" section
    // const departmentSection = document.querySelector(
    //   "#Which-department-am-i-in"
    // );
    // if (departmentSection) {
    //   scrapedData.department = departmentSection
    //     .querySelector(".cd_para.oview")
    //     .textContent.trim();
    // }

    // Extract tuition fees
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
    console.log("scraped", scrapedData.whatWillLearn);
    return scrapedData;
  });

  fs.writeFile("singleView.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("FILE_SAVED");
  });

  console.log("singleCourse", data);

  await browser.close();

  return data;
}

module.exports = scrapeSingleContent;
