class CustomError extends Error {
  constructor(message, status) {
    super(message);
    status = this.status;
  }
}

module.exports = CustomError;
