const scrapeCourses = require("../scrollers/hotCourses/partTwo");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs").promises;

const getUniversitiesPartTwo = async (req, res) => {
  const universities = req.body;
  //  validate universities in the request
  console.log("yuni", universities);
  //  --------------
  try {
    await scrapeCourses(universities);
    const courseUrls = await fs.readFile("courses/courses.json", "utf-8");
    const allCourses = JSON.parse(courseUrls);
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: allCourses,
      },
    });
    console.log(allCourses);
  } catch (error) {
    // throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
    console.log(error);
  }
};

module.exports = getUniversitiesPartTwo;
