import mongoose from "mongoose";

const RoadmapSchema =
  new mongoose.Schema({
    title: String,
    category: String,
    level: String,
    duration: String,
    time: String,
    edcoins: Number,
    sort: Number,
    action: String,
  });

export default
  mongoose.models.Roadmap ||
  mongoose.model(
    "Roadmap",
    RoadmapSchema
  );