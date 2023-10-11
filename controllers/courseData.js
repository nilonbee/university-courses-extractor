// const { StatusCodes } = require("http-status-codes");
// const scrapeAllCourses = require("../scrollers/hotCourses/partThree");
// const fs = require("fs").promises;

// // Flatten the array of course links

// const getUniversitiesPartThree = async (req, res) => {
//   const courses = req.body;
//   // validate
//   try {
//     // Create an empty array and write it to scrapedTestData.json
//     const emptyData = [];
//     await fs.writeFile(
//       "scrapedData/scrapedTestData.json",
//       JSON.stringify(emptyData)
//     );

//     await scrapeAllCourses(courses);

//     // Read the universities.json file after scraping is done
//     const courseData = await fs.readFile(
//       "scrapedData/scrapedTestData.json",
//       "utf-8"
//     );
//     const allCourseData = JSON.parse(courseData);

//     res.status(StatusCodes.OK).json({
//       message: "SUCCESS",
//       payload: {
//         data: allCourseData,
//       },
//     });
//     console.log(allCourseData);
//   } catch (error) {
//     // Handle errors appropriately
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "Error occurred while scraping courses.",
//       error: error.message,
//     });
//   }
// };

// module.exports = getUniversitiesPartThree;

const { StatusCodes } = require("http-status-codes");
const scrapeAllCourses = require("../scrollers/hotCourses/partThree");
const fs = require("fs").promises;

const getUniversitiesPartThree = async (req, res) => {
  const courses = req.body;

  try {
    // Clear the data file before starting
    await fs.writeFile("scrapedData/scrapedTestData.json", "[]");

    // Scrape the courses and wait for it to complete
    await scrapeAllCourses(courses);

    // Read the data from the updated file
    const courseData = await fs.readFile(
      "scrapedData/scrapedTestData.json",
      "utf-8"
    );
    const allCourseData = JSON.parse(courseData);

    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: allCourseData,
      },
    });
    console.log(allCourseData);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error occurred while scraping courses.",
      error: error.message,
    });
  }
};

module.exports = getUniversitiesPartThree;
