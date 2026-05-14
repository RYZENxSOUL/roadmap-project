import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  roadmap_title: String,
  category: String,
  total_edcoins: Number,
  total_time: Number,
});

export default mongoose.models.Roadmap || 
  mongoose.model('Roadmap', roadmapSchema);