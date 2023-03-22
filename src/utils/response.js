class Response {
  constructor(res) {
    this.res = res;
  }

  badRequest(statusCode, message) {
    this.res.status(statusCode).json({ status: "fail", message: message });
  }
}
