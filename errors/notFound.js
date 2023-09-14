const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./costomApiError");

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
