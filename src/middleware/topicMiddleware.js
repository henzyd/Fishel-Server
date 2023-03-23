const { Topic } = require("../db/models");
const Response = require("../utils/response");
const { checkID } = require("../utils/validate");

async function checkTopicID(req, res, next) {
  /**
   * This middleware is used to check the Topic id being passed in the request exists
   */

  const { topicId } = req.body;
  console.log(topicId);

  if (topicId) {
    if (!checkID(topicId)) {
      return new Response(res).badRequest("Invalid ID format");
    }
  } else {
    return new Response(res).badRequest("Topic is required");
  } //? NOTE: come back to this

  try {
    const topic = await Topic.findById(topicId)
      .populate({ path: "subject", select: "name" })
      .select("-__v");
    if (!topic) {
      return new Response(res).notFound("Topic not found");
    }
    res.locals.topic = topic;
  } catch (err) {
    return next(err);
  }

  next();
}

module.exports = { checkTopicID };
