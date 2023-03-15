const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
    enum: ["GOVERNMENT", "TEST"],
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
});

const TopicSchema = new Schema({
  topicName: {
    type: String,
    required: [true, "Topic name is required"],
    // enum: ["GOVERNMENT", "TEST"],
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
});

const Subject = mongoose.model("Subject", SubjectSchema);
const Topic = mongoose.model("Topic", TopicSchema);

module.exports = { Subject, Topic };
