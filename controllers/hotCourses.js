const courses = require("../courses.json");
const scrapeHotCourses = require("../scrollers/uk/courses");
const { StatusCodes } = require("http-status-codes");

const getHotCourses  = async (req, res) => {
  try {
    await scrapeHotCourses();
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: courses,
      },
    });
    console.log(courses);
  } catch (error) {
    // throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
    console.log(error);
  }
};

module.exports = getHotCourses;
