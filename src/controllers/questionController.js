const { Question } = require("../db/models");
const Response = require("../utils/response");

async function getAllQuestion(req, res) {
  /**
   * This controller is responsible for getting all the questions related to the `sujectId` and `topicId`
   */

  try {
    const questions = await Question.find()
      .populate({ path: "topic", select: "name" })
      .select("-__v");
    if (questions) {
      return new Response(res).success(questions, questions.length);
    }
  } catch (err) {
    return new Response(res).serverError(err.message);
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
      questionAuthor: questionAuthor,
      questionText: questionText,
      questionType: questionType,
      questionLevel: questionLevel,
      isVerified: isVerified,
    });
    await question.save();
    res.locals.topic.questions.push(question._id);
    await res.locals.topic.save();
    // if (question) {
    return new Response(res).created(question);
    // }
  } catch (err) {
    return new Response(res).badRequest(err.message);
  }
}

async function getQuestion(req, res) {
  /**
   * This controller is responsible for getting a question
   */

  return new Response(res).success(res.locals.question);
}

module.exports = { getAllQuestion, createQuestion, getQuestion };
