const { Subject } = require("../db/models");

async function getAllSubject(req, res) {
  try {
    const subjects = await Subject.find().select("-__v");
    res.status(200).json({
      status: "success",
      data: { subjects },
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

module.exports = { getAllSubject, createSubject };
