const { Topic } = require("../db/models");
const Response = require("../utils/response");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find({ subject: res.locals.subject._id })
      .populate({ path: "subject", select: "name " })
      .select("-__v");
    return new Response(res).success(topics);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function createTopic(req, res) {
  try {
    const topic = await Topic.create({
      subject: req.body.subjectId,
      name: req.body.name,
    });
    if (topic) {
      return new Response(res).created(topic);
    }
  } catch (err) {
    return new Response(res).badRequest("invalid topic data");
  }
}

async function getTopic(req, res) {
  /**
   * This controller is responsible for getting a topic
   */

  return new Response(res).success(res.locals.topic);
}

async function updateTopic(req, res) {
  /**
   * This controller is responsible for updating a topic
   */

  const body = req.body;

  try {
    const topic = await Topic.findByIdAndUpdate(req.params.topicId, body, {
      new: true,
      runValidators: true,
    }).select("-__v");
    if (topic) {
      return new Response(res).success(topic);
    }
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function deleteTopic(req, res) {
  /**
   * This controller is responsible for deleting a topic
   */

  try {
    await Topic.findByIdAndDelete(req.params.topicId);
    return new Response(res).noContent("Topic deleted successfully");
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

module.exports = {
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
};
