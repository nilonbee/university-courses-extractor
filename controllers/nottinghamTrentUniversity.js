const getScreenshot = require("../scrollers/ntu/coursesScroller");
const getInformation = require("../scrollers/ntu/infoScroller");
const { StatusCodes } = require("http-status-codes");
const courses = require("../courses.json");
const information = require("../information.json");
const { CustomApiError } = require("../errors");

const getDataByNottinghamTrentUniversity = async (req, res) => {
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
    // throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
    console.log(error);
  }
};

const getInformationByNottinghamTrentUniversity = async (req, res) => {
  try {
    await getInformation();
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: information,
      },
    });
    console.log(information);
  } catch (error) {
    throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
  }
};
module.exports = {
  getDataByNottinghamTrentUniversity,
  getInformationByNottinghamTrentUniversity,
};
