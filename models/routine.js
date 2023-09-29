const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      require: true,
    },
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
  uid: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  routine: [
    {
      routine_title: { type: String, require: true },
      routine_exercise: [
        {
          exercise_name: { type: String, require: true },
          exercise_type: { type: String, require: true },
          exercise_reps: { type: Number, require: true },
          exercise_sets: { type: Number, require: true },
        },
      ],
    },
  ],
});

const UserExercise = mongoose.model("Exercise", exerciseSchema);
const UserRoutine = mongoose.model("Routine", routineSchema);
module.exports = { UserExercise, UserRoutine };
