const { Question } = require("../db/models");

async function getAllQuestion(req, res) {
  /**
   * This controller is responsible for getting all the questions related to the `sujectId` and `topicId`
   */

  try {
    const questions = await Question.find()
      .populate({ path: "subject", select: "name" })
      .populate({ path: "topic", select: "name" })
      .select("-__v");
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

async function createQuestion(req, res) {
  /**
   * This controller is responsible for creating a new question
   */

  const {
    questionAuthor,
    questionText,
    questionType,
    questionLevel,
    isVerified,
  } = req.body;

  try {
    const question = await Question.create({
      topic: res.locals.topic._id,
      subject: res.locals.subject._id,
      questionAuthor: questionAuthor,
      questionText: questionText,
      questionType: questionType,
      questionLevel: questionLevel,
      isVerified: isVerified,
    });
    if (question) {
      return res.status(201).json({
        status: "success",
        data: {
          question,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function getQuestion(req, res) {
  /**
   * This controller is responsible for getting a question
   */

  res.status(200).json({
    status: "success",
    data: {
      question: res.locals.question,
    },
  });
}

module.exports = { getAllQuestion, createQuestion, getQuestion };
