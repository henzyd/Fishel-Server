const express = require("express");
const morgan = require("morgan");
const subjectRouter = require("./routers/subjectRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const baseURL = "/api";

app.get(`${baseURL}/`, (req, res) => {
  res.status(200).json({
    message: "Welcome to the fishel api",
  });
});
app.use(`${baseURL}/subject`, subjectRouter);

module.exports = app;
