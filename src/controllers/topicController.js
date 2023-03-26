const { Topic } = require("../db/models");
const Response = require("../utils/response");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find({ subject: res.locals.subject._id })
      .populate({ path: "subject", select: "name" })
      .select("-__v");
    return new Response(res).success(topics, topics.length);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function createTopic(req, res) {
  const existingTopic = await Topic.findOne({ name: req.body.name });
  if (existingTopic) {
    return new Response(res).badRequest(
      `Topic with name "${req.body.name}" already exists`
    );
  }
  try {
    const topic = new Topic({
      subject: res.locals.subject._id,
      name: req.body.name,
    });
    await topic.save();
    res.locals.subject.topics.push(topic._id);
    await res.locals.subject.save();
    // if (topic) {
    return new Response(res).created(topic);
    // }
  } catch (err) {
    // return new Response(res).badRequest("invalid topic data");
    return new Response(res).badRequest(err.message);
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

  const { name } = req.body;

  console.log(name);
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.topicId,
      { name },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");
    console.log(topic);

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
