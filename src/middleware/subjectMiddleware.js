const mongoose = require("mongoose");
const { Subject } = require("../db/models");

const ObjectId = mongoose.Types.ObjectId;

async function checkSubjectID(req, res, next) {
  /**
   * This middleware is used to check the Subject id being passed in the params exists
   */

  const { subjectId } = req.params;

  if (!ObjectId.isValid(subjectId)) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid ID format" });
  }

  try {
    const subject = await Subject.findById(subjectId).select("-__v");
    if (!subject) {
      return res.status(404).json({
        status: "fail",
        message: "Subject not found",
      });
    }
    res.locals.subject = subject;
  } catch (err) {
    return next(err);
  }
  next();
}

module.exports = { checkSubjectID };
