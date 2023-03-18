const { Topic } = require("../db/models");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find().select("-__v");
    res.status(200).json({
      status: "success",
      data: {
        topics,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function createTopic(req, res) {
  try {
    const topic = await Topic.create({});
    if (topic) {
      res.status(200).json({
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
