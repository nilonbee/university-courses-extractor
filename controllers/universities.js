const universities = require("../universities.json");
const scrapeUniversities = require("../scrollers/uk/universities-uk");
const { StatusCodes } = require("http-status-codes");

const getUniversities = async (req, res) => {
  try {
    await scrapeUniversities();
    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: universities,
      },
    });
    console.log(universities);
  } catch (error) {
    // throw new CustomApiError(error, StatusCodes.BAD_REQUEST);
    console.log(error);
  }
};

module.exports = getUniversities;
