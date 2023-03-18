const { Subject } = require("../db/models");

async function checkSubjectID(req, res, next) {
  /**
   * This middleware is used to check the Subject id being passed in the request exists
   */

  const subjectId = req.body.subject;
  if (!subjectId) {
    return res.status(400).json({ status: "fail", message: "invalid subject" });
  }

  try {
    const subject = await Subject.findById(subjectId);
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Subject not found",
    });
  }

  next();
}

module.exports = { checkSubjectID };
