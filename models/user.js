const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hashed: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
