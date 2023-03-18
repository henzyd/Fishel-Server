const express = require("express");
const { getAllTopics, createTopic } = require("../controllers/topicController");

const router = express.Router();

router.route("/").get(getAllTopics).post(createTopic);

module.exports = router;
