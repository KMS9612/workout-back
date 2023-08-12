const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    exercise: [
      {
        exercise_name: { type: String, require: true },
        exercise_type: { type: String, require: true },
      },
    ],
  },
  { timestamps: true }
);

const routineSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  routine: [
    {
      routine_title: { type: String, require: true },
    },
  ],
});

const UserExercise = mongoose.model("Exercise", exerciseSchema);
module.exports = { UserExercise };
