const express = require("express");
const { getAllTopics, createTopic } = require("../controllers/topicController");
const { checkSubjectID } = require("../middleware/subjectMiddleware");

const router = express.Router();

router
  .route("/:subjectId/topic")
  .get([checkSubjectID], getAllTopics)
  .post([checkSubjectID], createTopic);

module.exports = router;
