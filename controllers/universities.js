const scrapeUniversities = require("../scrollers/hotCourses/partOne");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs").promises;

const getUniversities = async (req, res) => {
  try {
    // Wait for the scraping process to complete
    await scrapeUniversities(req.body.state);

    // Read the universities.json file after scraping is done
    const universitiesData = await fs.readFile(
      "universities/universities.json",
      "utf-8"
    );
    const universities = JSON.parse(universitiesData);

    res.status(StatusCodes.OK).json({
      message: "SUCCESS",
      payload: {
        data: universities,
      },
    });
  } catch (error) {
    // Handle any errors that might occur during scraping or reading the file
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching universities data.",
      error: error.message,
    });
  }
};

module.exports = getUniversities;
