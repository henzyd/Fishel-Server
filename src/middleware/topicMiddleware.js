const mongoose = require("mongoose");
const { Subject } = require("../db/models");

const ObjectId = mongoose.Types.ObjectId;

async function checkTopicID(req, res, next) {
  /**
   * This middleware is used to check the Subject id being passed in the request exists
   */

  const { topicId } = req.params;

  if (!ObjectId.isValid(topicId)) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid ID format" });
  }

  try {
    const topic = await Subject.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        status: "fail",
        message: "Topic not found",
      });
    }
    res.locals.topic = topic;
  } catch (err) {
    return next(err);
  }

  next();
}

module.exports = { checkTopicID };
