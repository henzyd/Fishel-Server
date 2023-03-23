const express = require("express");
const {
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");
const { checkBodySubjectID } = require("../middleware/subjectMiddleware");
const { checkTopicID } = require("../middleware/topicMiddleware");

const router = express.Router();

router
  .route("/")
  .get([checkBodySubjectID], getAllTopics)
  .post([checkBodySubjectID], createTopic);

router
  .route("/:topicId")
  .get([checkBodySubjectID, checkTopicID], getTopic)
  .patch([checkBodySubjectID, checkTopicID], updateTopic)
  .delete([checkBodySubjectID, checkTopicID], deleteTopic);

module.exports = router;
