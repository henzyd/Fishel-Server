const express = require("express");
const morgan = require("morgan");
const subjectRouter = require("./routers/subjectRouter");
const topicRouter = require("./routers/topicRouter");
const questionRouter = require("./routers/questionRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const baseURL = "/api";

app.get(`${baseURL}/`, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the fishel api",
  });
});
app.use(`${baseURL}/subject`, subjectRouter);
app.use(`${baseURL}/subject`, topicRouter);
app.use(`${baseURL}/subject`, questionRouter);

module.exports = app;
