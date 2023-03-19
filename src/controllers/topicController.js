const { Topic } = require("../db/models");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find()
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

module.exports = { getAllTopics, createTopic };
