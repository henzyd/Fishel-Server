const { Subject } = require("../db/models");

async function getAllSubject(req, res) {
  try {
    const subjects = await Subject.find();
    res.status(200).json({
      status: "success",
      data: { subjects },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = { getAllSubject };
