const express = require("express");
const {
  getAllQuestion,
  createQuestion,
  getQuestion,
} = require("../controllers/questionController");
const { checkQuestionID } = require("../middleware/questionMiddleware");
const { checkSubjectID } = require("../middleware/subjectMiddleware");
const { checkTopicID } = require("../middleware/topicMiddleware");

const router = express.Router();

router
  .route("/:subjectId/topic/:topicId/question")
  .get([checkSubjectID, checkTopicID], getAllQuestion)
  .post([checkSubjectID, checkTopicID], createQuestion);

router
  .route("/:subjectId/topic/:topicId/question/:questionId")
  .get([checkSubjectID, checkTopicID, checkQuestionID], getQuestion);

module.exports = router;
