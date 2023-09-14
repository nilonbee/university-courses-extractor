const singleView = require("../singleView.json");
const scrapeSingleContent = require("../scrollers/uk/singleCourse");
const { StatusCodes } = require("http-status-codes");

const getSingleCourse = async (req, res) => {
  try {
    await scrapeSingleContent();
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: singleView,
      },
    });
    console.log(singleView);
  } catch (error) {
    // throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
    console.log(error);
  }
};

module.exports = getSingleCourse;
