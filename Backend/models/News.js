// models/News.js
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: { type: String, default: null }, // Store media path
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

export default News;  // Default export
