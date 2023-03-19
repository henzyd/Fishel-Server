const express = require("express");
const {
  getAllSubject,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");
const { checkSubjectID } = require("../middleware/subjectMiddleware");

const router = express.Router();

router.route("/").get(getAllSubject).post(createSubject);

router
  .route("/:subjectId")
  .get([checkSubjectID], getSubject)
  .patch([checkSubjectID], updateSubject)
  .delete([checkSubjectID], deleteSubject);

module.exports = router;
