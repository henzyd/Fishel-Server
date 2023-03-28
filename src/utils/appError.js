class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //? NOTE: here i am calling Error contrsuctor and passing the message to it => new Error(message)
    //? NOTE: When ever you extend a class you have to call the super() method to get access to the parent class constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; //? NOTE: this is use to tell if the error was cause by an incorrect user(client) operation e.g wrong id, invalid type, etc

    Error.captureStackTrace(this, this.constructor); //? NOTE: this is use to remove the constructor from the stack trace
  }
}

module.exports = AppError;
