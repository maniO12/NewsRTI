import mongoose from 'mongoose';

// RTI Report Schema
const rtiReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  sector: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Resolved'
  createdAt: { type: Date, default: Date.now },
});

// Public Service Report Schema
const publicServiceReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  sector: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  media: { type: String }, // URL to the uploaded media
  status: { type: String, default: 'Pending' }, // 'Pending', 'In Progress', 'Resolved'
  createdAt: { type: Date, default: Date.now },
});

// Create models
const RTIReport = mongoose.model('RTIReport', rtiReportSchema);
const PublicServiceReport = mongoose.model('PublicServiceReport', publicServiceReportSchema);

export { RTIReport, PublicServiceReport };
