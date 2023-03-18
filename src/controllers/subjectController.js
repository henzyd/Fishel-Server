const { Subject } = require("../db/models");

async function getAllSubject(req, res) {
  try {
    const subjects = await Subject.find().select("-__v");
    res.status(200).json({
      status: "success",
      data: { subjects },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function createSubject(req, res) {
  try {
    const subject = await Subject.create({ subject: req.body.subject });
    if (subject) {
      return res.status(201).json({
        status: "success",
        data: {
          subject,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function getSubject(req, res) {
  /**
   * This controller is responsible for getting a single subject by its id
   */

  res.status(200).json({
    status: "success",
    subject: res.locals.subject,
  });
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
    if (subject) {
      res.status(200).json({ status: "success", data: subject });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

async function deleteSubject(req, res) {
  /**
   * This controller is responsible for deleting a subject
   */

  try {
    await Subject.findByIdAndDelete(req.params.subjectId);
    res.status(204).json({
      status: "success",
      message: "Subject deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

module.exports = {
  getAllSubject,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
