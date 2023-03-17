const { Question } = require("../db/models");

async function getAllQuestion(req, res) {
  try {
    const questions = await Question.find().select("-__v");
    if (questions) {
      res.status(200).json({
        status: "success",
        data: {
          questions,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

module.exports = { getAllQuestion };
