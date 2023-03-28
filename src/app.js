const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const subjectRouter = require("./routers/subjectRouter");
const topicRouter = require("./routers/topicRouter");
const questionRouter = require("./routers/questionRouter");
const {
  getGenerateData,
  getQueryQuestions,
} = require("./controllers/generate");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());

const baseURL = ""; //? NOTE: this was `/api`

app.get(`${baseURL}/`, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the fishel api",
  });
});
app.use(`${baseURL}/subject`, subjectRouter);
app.use(`${baseURL}/topic`, topicRouter);
app.use(`${baseURL}/question`, questionRouter);
app.use(`${baseURL}/generate`, getGenerateData);
app.use(`${baseURL}/generate-questions`, getQueryQuestions);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
