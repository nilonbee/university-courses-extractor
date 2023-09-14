const { StatusCodes } = require("http-status-codes");
const courses = require("../courses.json");
const information = require("../information.json");
const { CustomApiError } = require("../errors");

const getScreenshot = require("../scrollers/southAustraila/undergraduate/aboriginal/coursesScroller");
const getInfoUnisa = require("../scrollers/uk/infoScroller");
const getCoursesUnisa = async (req, res) => {
  try {
    await getScreenshot();
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: courses,
      },
    });
    console.log(courses);
  } catch (error) {
    throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
  }
};

const getInfo = async (req, res) => {
  await getInfoUnisa();
  res.status(StatusCodes.OK).json({
    message: "SUCCESS",
    payload: {
      data: { information },
    },
  });
};

module.exports = { getCoursesUnisa, getInfo };
