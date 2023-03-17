const express = require("express");
const { getAllTopics } = require("../controllers/topicController");

const router = express.Router();

router.route("/").get(getAllTopics);

module.exports = router;
