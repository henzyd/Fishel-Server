const { Subject, Question, Topic } = require("../db/models");
const Response = require("../utils/response");

async function getGenerateData(req, res) {
  /**
   * thi controller is responsible for getting the generate data
   */

  try {
    const result = await Subject.aggregate([
      // Join with Topic model
      {
        $lookup: {
          from: "topics",
          localField: "topics",
          foreignField: "_id",
          as: "topics",
        },
      },
      // Unwind the topics array
      { $unwind: "$topics" },
      // Join with Question model
      {
        $lookup: {
          from: "questions",
          localField: "topics.questions",
          foreignField: "_id",
          as: "questions",
        },
      },
      // Group by Subject and Topic, and count questions
      {
        $group: {
          _id: {
            subjectId: "$_id",
            subjectName: "$name",
            topicId: "$topics._id",
            topicName: "$topics.name",
          },
          questionCount: { $sum: { $size: "$questions" } },
        },
      },
      // Group by Subject, and push topics and questionCount into an array
      {
        $group: {
          _id: "$_id.subjectId",
          name: { $first: "$_id.subjectName" },
          topics: {
            $push: {
              _id: "$_id.topicId",
              name: "$_id.topicName",
            },
          },
          questionCount: { $sum: "$questionCount" },
        },
      },
      // Sort by name ascending
      { $sort: { name: 1 } },
    ]);

    console.log(result);

    return new Response(res).success(result);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

async function getQueryQuestions(req, res) {
  /**
   * This controller is responsible for getting questions related to the `subject` and `topics` based on the query
   */

  const { subject, topics, difficulty } = req.body;

  try {
    const subjectDoc = await Subject.findOne({ name: subject })
      .populate({
        path: "topics",
        match: { name: { $in: topics } },
        select: "_id",
      })
      .select("_id");

    const topicDocs = await Topic.find({
      subject: subjectDoc._id,
      name: { $in: topics },
    })
      .populate({
        path: "questions",
        match: { questionLevel: difficulty },
        populate: [
          {
            path: "options",
            select: "text isCorrect -_id",
          },
          {
            path: "topic",
            select: "name -_id",
          },
        ],
        select:
          "topic questionAuthor questionText questionType questionLevel isVerified options -_id",
      })
      .select("name -_id");

    const questions = topicDocs.flatMap((topic) => topic.questions);

    const result = {
      subject,
      topics: topicDocs.map((topic) => topic.name),
      totalQuestions: questions.length,
      questions,
    };

    console.log(result);

    return new Response(res).success(result, result.length);
  } catch (err) {
    return new Response(res).serverError(err.message);
  }
}

const x = {
  subject: "Government",
  topics: ["Diarchy", "Federalism", "Nazism"],
  questions: [
    {
      _id: "642070460cce359e16a484f1",
      questionAuthor: "WAEC",
      questionText:
        "Which of the following is NOT a characteristic of the parliamentary system of government?",
      questionType: "Objective",
      questionLevel: "easy",
      isVerified: true,
      createdAt: "2023-03-26T16:18:14.645Z",
      updatedAt: "2023-03-26T16:18:14.645Z",
      options: [
        {
          _id: "642070460cce359e16a484f4",
          text: "This is a boy 2",
          isCorrect: true,
        },
        {
          _id: "642070460cce359e16a484f5",
          text: "This is a boy 3",
          isCorrect: false,
        },
        {
          _id: "642070460cce359e16a484f6",
          text: "This is a boy 4",
          isCorrect: false,
        },
        {
          _id: "642070460cce359e16a484f3",
          text: "This is a boy 1",
          isCorrect: false,
        },
      ],
    },
  ],
};

module.exports = { getGenerateData, getQueryQuestions };
