const express = require("express");
const { getAllTopics, createTopic } = require("../controllers/topicController");
const { checkSubjectID } = require("../middleware/topicMiddleware");

const router = express.Router();

router
  .route("/")
  .get([checkSubjectID], getAllTopics)
  .post([checkSubjectID], createTopic);

module.exports = router;
