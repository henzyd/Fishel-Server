const { Topic } = require("../db/models");

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find();
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

module.exports = { getAllTopics };
