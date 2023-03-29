const { Question } = require("../db/models");
const Response = require("../utils/response");
const { checkID } = require("../utils/validate");
const AppError = require("../utils/appError");

async function validateQuestion(req, res, next) {
  /**
   * This middleware is used to validate the question object being passed in the request
   */

  const {
    questionAuthor,
    questionText,
    questionType,
    questionLevel,
    isVerified,
    options,
  } = req.body;

  if (
    !questionAuthor ||
    !questionText ||
    !questionType ||
    !questionLevel ||
    !isVerified ||
    !options
  ) {
    return next(
      new AppError(
        "(questionAuthor, questionText, questionType, questionLevel, isVerified, options) are required",
        400
      )
    );
  }

  // if (typeof questionAuthor !== "string") {
  //   next(new AppError("questionAuthor should be a string", 400));
  // }

  next();
}

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
      .populate({ path: "topic", select: "name" })
      .populate({ path: "options", select: "text isCorrect" })
      .select("-__v");
    if (!question) {
      return new Response(res).notFound("Question not found");
    }
    res.locals.question = question;
  } catch (err) {
    next(new AppError(err.message, 500));
  }

  next();
}

module.exports = { checkQuestionID };
