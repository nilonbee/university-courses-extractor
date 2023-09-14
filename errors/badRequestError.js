const { StatusCodes } = require("http-status-codes");
const CustomApiError = require('./costomApiError');

class BadRequestError extends CustomApiError {
  constructor(message) {
    message = this.message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
