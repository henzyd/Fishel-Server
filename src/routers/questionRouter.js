const express = require("express");
const {
  getAllQuestion,
  createQuestion,
  getQuestion,
} = require("../controllers/questionController");
const { checkQuestionID } = require("../middleware/questionMiddleware");
const { checkBodyTopicID } = require("../middleware/topicMiddleware");

const router = express.Router();

router
  .route("/")
  .get([checkBodyTopicID], getAllQuestion)
  .post([checkBodyTopicID], createQuestion);

router
  .route("/:questionId")
  .get([checkBodyTopicID, checkQuestionID], getQuestion);

module.exports = router;
