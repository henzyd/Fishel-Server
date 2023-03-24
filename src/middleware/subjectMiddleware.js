const { Subject } = require("../db/models");
const Response = require("../utils/response");
const { checkID } = require("../utils/validate");

async function checkSubjectID(req, res, next) {
  /**
   * This middleware is used to check the Subject id being passed in the params exists
   */

  const { subjectId } = req.params;

  if (!checkID(subjectId)) {
    return new Response(res).badRequest("Invalid ID format");
  }

  try {
    const subject = await Subject.findById(subjectId).select("-__v");
    if (!subject) {
      return new Response(res).notFound("Subject not found");
    }
    res.locals.subject = subject;
  } catch (err) {
    return next(err);
  }
  next();
}

async function checkBodySubjectID(req, res, next) {
  /**
   * This middleware is used to check the Subject id being passed in the params exists
   */

  const { subjectId } = req.body;

  if (!subjectId) {
    return new Response(res).badRequest("Subject is required");
  }

  if (!checkID(subjectId)) {
    return new Response(res).badRequest("Invalid ID format");
  }

  try {
    const subject = await Subject.findById(subjectId).select("-__v");
    if (!subject) {
      return new Response(res).notFound("Subject not found");
    }
    res.locals.subject = subject;
    console.log(res.locals.subject);
  } catch (err) {
    return next(err);
  }
  next();
}

module.exports = { checkSubjectID, checkBodySubjectID };
