const express = require("express");
const {
  getAllSubject,
  createSubject,
} = require("../controllers/subjectController");

const router = express.Router();

router.route("/").get(getAllSubject).post(createSubject);

module.exports = router;
