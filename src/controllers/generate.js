const { Subject } = require("../db/models");
const Response = require("../utils/response");

async function getGenerateData(req, res) {
  /**
   * thi controller is responsible for getting the generate data
   */

  try {
    const subject = await Subject.aggregate([
      // {
      //   $unwind: "$topics", //? NOTE: Unwind the topics array to create a new document for each topic
      // },
      // {
      //   $group: {
      //     _id: "$_id",
      //     subject: { $first: "$name" },
      //     topics: { $addToSet: { _id: "$topics._id", name: "$topics.name" } }, //? NOTE: this extracts topic names and add them to a set
      //   },
      // },
      {
        $lookup: {
          from: "topics",
          localField: "topics",
          foreignField: "_id",
          as: "topics",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          topics: { _id: 1, name: 1 },
        },
      },
      //? NOTE: The above pipeline is looking for the topics collection and then it is projecting the _id and name of the topics collection then it is adding it to the subject collection
    ]);
    return new Response(res).success(subject);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

module.exports = { getGenerateData };
