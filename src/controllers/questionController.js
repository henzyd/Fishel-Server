const { Question, Option } = require("../db/models");
const Response = require("../utils/response");

async function getAllQuestion(req, res) {
  /**
   * This controller is responsible for getting all the questions related to the `sujectId` and `topicId`
   */

  try {
    const questions = await Question.find()
      .populate({ path: "topic", select: "name" })
      .populate({ path: "options", select: "text isCorrect" })
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
    options,
  } = req.body;

  try {
    const question = await Question({
      topic: res.locals.topic._id,
      questionAuthor: questionAuthor,
      questionText: questionText,
      questionType: questionType,
      questionLevel: questionLevel.toLowerCase(),
      isVerified: isVerified,
    });
    // await question.save();
    res.locals.topic.questions.push(question._id);

    for (const item of options) {
      item.question = question._id;
    }
    const option = await Option.create([...options]);
    question.options = option;

    const questionObj = await question.save();
    await res.locals.topic.save();

    return new Response(res).created(questionObj);
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
