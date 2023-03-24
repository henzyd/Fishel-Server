const { Question } = require("../db/models");
const Response = require("../utils/response");
const { checkID } = require("../utils/validate");

async function checkQuestionID(req, res, next) {
  /**
   * This middleware is used to check the question id being passed in the request exists
   */

  const { questionId } = req.params;

  if (!checkID(questionId)) {
    return new Response(res).badRequest("Invalid ID format");
  }

  try {
    const question = await Question.findById(questionId)
      .populate({ path: "subject", select: "name" })
      .populate({ path: "topic", select: "name" })
      .select("-__v");
    if (!question) {
      return new Response(res).notFound("Question not found");
    }
    res.locals.question = question;
  } catch (err) {
    return next(err);
  }

  next();
}

module.exports = { checkQuestionID };
