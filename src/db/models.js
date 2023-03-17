const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Subject = mongoose.model(
  "Subject",
  new Schema({
    subject: {
      type: String,
      required: [true, "Subject is required"],
      enum: {
        values: ["Government", "Test"],
        message:
          '{VALUE} is not a valid question type. Please choose from "Government", or "Test".',
      },
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  })
);

const Topic = mongoose.model(
  "Topic",
  new Schema({
    topic: {
      type: String,
      required: [true, "Topic is required"],
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  })
);

const Question = mongoose.model(
  "Question",
  new Schema(
    {
      questionAuthor: {
        type: String,
        required: [true, "Question author is required field"],
      },
      questionText: {
        type: String,
        required: [true, "Question text is required field"],
      },
      questionType: {
        type: String,
        required: [true, "Question type is required field"],
        enum: {
          values: ["Objective", "Theory", "Essay"],
          message:
            '{VALUE} is not a valid question type. Please choose from "Objective", "Theory", or "Essay".',
        },
      },
      questionLevel: {
        type: String,
        required: [true, "Question level is required field"],
        enum: {
          values: ["Easy", "Medium", "Hard"],
          message:
            '{VALUE} is not a valid question type. Please choose from "Objective", "Theory", or "Essay".',
        },
      },
      isVerified: {
        type: Boolean,
        required: [true, "Is verified is a required field"],
      },
      subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
      topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    },
    { timestamps: true }
  )
);

module.exports = { Subject, Topic, Question };
