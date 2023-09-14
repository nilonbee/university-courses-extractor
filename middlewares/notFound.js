const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "The route is not exist or has been removed..." });
};

module.exports = notFound;
