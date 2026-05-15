import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: ".env.local",
});

const roadmapData = JSON.parse(
  fs.readFileSync(
    "./app/data/roadmapData.json",
    "utf-8"
  )
);

const MONGODB_URI =
  process.env.MONGODB_URI;

const roadmapSchema =
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

const Roadmap =
  mongoose.models.Roadmap ||
  mongoose.model(
    "Roadmap",
    roadmapSchema
  );

async function seedDatabase() {
  try {
    await mongoose.connect(
      MONGODB_URI
    );

    console.log(
      "✅ Connected to MongoDB"
    );

    await Roadmap.deleteMany({});

    console.log(
      "✅ Old data deleted"
    );

    await Roadmap.insertMany(
      roadmapData
    );

    console.log(
      "✅ New data inserted"
    );

    await mongoose.connection.close();

    console.log(
      "✅ Database seeded successfully"
    );
  } catch (error) {
    console.log(error);
  }
}

seedDatabase();