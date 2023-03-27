const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Subject = mongoose.model(
  "Subject",
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Subject is required"],
        // enum: {
        //   values: ["Government", "Test"],
        //   message:
        //     '{VALUE} is not a valid question type. Please choose from "Government", or "Test".',
        // },
        unique: true,
        trim: true,
      },
      topics: [
        {
          type: Schema.Types.ObjectId,
          ref: "Topic",
        },
      ],
      // questions: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "Question",
      //   },
      // ],
    },
    { timestamps: true }
  ).pre("findOneAndDelete", async function (next) {
    try {
      // Use the model to delete all topics with a matching subject
      await mongoose.model("Topic").deleteMany({ subject: this._id });
      next();
    } catch (err) {
      next(err);
    }
  })
);

const Topic = mongoose.model(
  "Topic",
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Topic is required"],
        unique: true,
        trim: true,
      },
      subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: [true, "subject is required"],
      },
      questions: [
        {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
    },
    { timestamps: true }
  )
);

const Question = mongoose.model(
  "Question",
  new Schema(
    {
      questionAuthor: {
        type: String,
        // required: [true, "Question author is required field"],
        // trim: true,
        validate: {
          validator: function (value) {
            return typeof value === "string";
          },
          message: "questionAuthor field should be a string",
        },
      },
      questionText: {
        type: String,
        required: [true, "Question text is required field"],
        trim: true,
      },
      questionType: {
        type: String,
        required: [true, "Question type is required field"],
        enum: {
          values: ["objective", "theory", "subjective"],
          message:
            '{VALUE} is not a valid question type. Please choose from "objective", "theory", or "subjective".',
        },
        default: "Objective",
      },
      questionLevel: {
        type: String,
        required: [true, "Question level is required field"],
        enum: {
          values: ["easy", "medium", "hard"],
          message:
            '{VALUE} is not a valid question type. Please choose from "easy", "medium", or "hard".',
        },
        default: "Easy",
      },
      isVerified: {
        type: Boolean,
        validate: [
          function (value) {
            return typeof value === "boolean";
          },
          "isVerified field should be a boolean value",
        ],
        default: false,
      },
      // subject: {
      //   type: Schema.Types.ObjectId,
      //   ref: "Subject",
      //   required: [true, "subject is required"],
      // },
      topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: [true, "topic is required"],
      },
      options: [
        {
          type: Schema.Types.ObjectId,
          ref: "Option",
          required: [true, "Options are required"],
        },
      ],
    },
    { timestamps: true }
  )
);

const Option = mongoose.model(
  "Option",
  new Schema({
    text: {
      type: String,
      required: [true, "Option text is required field"],
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      validate: {
        validator: function (value) {
          return typeof value === "boolean";
        },
        message: "isCorrect field should be a boolean value",
      },
      default: false,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Question id is required"],
    },
  })
);

module.exports = { Subject, Topic, Question, Option };
