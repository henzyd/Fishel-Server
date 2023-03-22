const mongoose = require("mongoose");
const { Topic } = require("../db/models");

const ObjectId = mongoose.Types.ObjectId;

async function checkTopicID(req, res, next) {
  /**
   * This middleware is used to check the Topic id being passed in the request exists
   */

  const { topicId } = req.body;

  if (topicId) {
    if (!ObjectId.isValid(topicId)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid ID format" });
    }
  } else {
    return res.status(400).json({ status: "fail", message: "Topic not found" });
  }

  try {
    const topic = await Topic.findById(topicId)
      .populate({ path: "subject", select: "name" })
      .select("-__v");
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
