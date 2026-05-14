require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');
const roadmapData = require('../app/data/roadmapData.json');

const MONGODB_URI = process.env.MONGODB_URI;

const roadmapSchema = new mongoose.Schema({
  roadmap_title: String,
  category: String,
  total_edcoins: Number,
  total_time: Number,
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Roadmap.deleteMany({});
    console.log('✅ Old data cleared');
    
    await Roadmap.insertMany(roadmapData);
    console.log('✅ Data inserted successfully!');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedDatabase();