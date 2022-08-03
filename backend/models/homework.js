const { Schema, model } = require("mongoose");

const HomeworkSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },

  {
    collection: "homeworks",
    timestamps: true,
  }
);
const Homework = model("Homework", HomeworkSchema);
module.exports = Homework;
