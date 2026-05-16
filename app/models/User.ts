import mongoose, { Schema } from "mongoose";

const wowGameSchema = new Schema({
  name: {
    type: String,
  },

  attempts: {
    type: Number,
    default: 3,
  },

  last_attempt: {
    type: Date,
    default: null,
  },

  total_attempts: {
    type: Number,
    default: 0,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  edcoins: {
    type: Number,
    default: 0,
  },

  wow_games: [wowGameSchema],
});

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;