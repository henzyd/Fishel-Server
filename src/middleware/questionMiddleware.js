const mongoose = require("mongoose");
const { Question } = require("../db/models");

const ObjectId = mongoose.Types.ObjectId;

async function checkQuestionID(req, res, next) {
  /**
   * This middleware is used to check the question id being passed in the request exists
   */

  const { questionId } = req.params;

  if (!ObjectId.isValid(questionId)) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid ID format" });
  }

  try {
    const question = await Question.findById(questionId)
      .populate({ path: "subject", select: "name" })
      .populate({ path: "topic", select: "name" })
      .select("-__v");
    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }
    res.locals.question = question;
  } catch (err) {
    return next(err);
  }

  next();
}

module.exports = { checkQuestionID };
