const { Schema, model } = require("mongoose");

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Please enter your password"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
  },

  {
    collection: "students",
    timestamps: true,
  }
);
const Student = model("Student", StudentSchema);
module.exports = Student;
