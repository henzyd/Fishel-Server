const { Subject } = require("../db/models");
const Response = require("../utils/response");

async function getAllSubject(req, res) {
  try {
    const subjects = await Subject.find().select("-__v").populate("topics");
    return new Response(res).success(subjects);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function createSubject(req, res) {
  try {
    const subject = await Subject.create({ name: req.body.name });
    if (subject) {
      return new Response(res).created(subject);
    }
  } catch (err) {
    return new Response(res).badRequest("Invalid subject data");
  }
}

async function getSubject(req, res) {
  /**
   * This controller is responsible for getting a single subject by its id
   */

  return new Response(res).success(res.locals.subject);
}

async function updateSubject(req, res) {
  /**
   * This controller is responsible for updating a subject
   */

  const body = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.subjectId,
      body,
      { new: true, runValidators: true }
    ).select("-__v");
    return new Response(res).success(subject);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function deleteSubject(req, res) {
  /**
   * This controller is responsible for deleting a subject
   */

  try {
    await Subject.findByIdAndDelete(req.params.subjectId);
    return new Response(res).noContent("Subject deleted successfully");
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

module.exports = {
  getAllSubject,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
