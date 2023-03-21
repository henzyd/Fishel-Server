const { Topic } = require("../db/models");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find({ subject: res.locals.subject._id })
      .populate({ path: "subject", select: "name " })
      .select("-__v");
    res.status(200).json({
      status: "success",
      data: {
        topics,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function createTopic(req, res) {
  try {
    const topic = await Topic.create({
      subject: req.params.subjectId,
      name: req.body.name,
    });
    if (topic) {
      res.status(201).json({
        status: "success",
        data: {
          topic,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function getTopic(req, res) {
  /**
   * This controller is responsible for getting a topic
   */

  res.status(200).json({
    status: "success",
    data: {
      topic: res.locals.topic,
    },
  });
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
      res.status(200).json({ status: "success", data: topic });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

async function deleteTopic(req, res) {
  /**
   * This controller is responsible for deleting a topic
   */

  try {
    await Topic.findByIdAndDelete(req.params.topicId);
    res.status(204).json({
      status: "success",
      message: "Topic deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

module.exports = {
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
};
