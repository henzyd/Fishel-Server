const express = require("express");
const {
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");
const { checkSubjectID } = require("../middleware/subjectMiddleware");
const { checkTopicID } = require("../middleware/topicMiddleware");

const router = express.Router();

router
  .route("/:subjectId/topic")
  .get([checkSubjectID], getAllTopics)
  .post([checkSubjectID], createTopic);

router
  .route("/:subjectId/topic/:topicId")
  .get([checkSubjectID, checkTopicID], getTopic)
  .patch([checkSubjectID, checkTopicID], updateTopic)
  .delete([checkSubjectID, checkTopicID], deleteTopic);

module.exports = router;
