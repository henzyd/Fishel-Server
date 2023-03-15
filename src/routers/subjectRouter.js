const express = require("express");
const { getAllSubject } = require("../controllers/subjectController");

const router = express.Router();

router.route("/").get(getAllSubject);

module.exports = router;
