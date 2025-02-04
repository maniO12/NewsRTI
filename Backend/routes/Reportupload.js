import express from 'express';
import multer from 'multer';
import path from 'path';
import { RTIReport, PublicServiceReport } from '../models/Reported.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save the files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  },
});

// Multer configuration for file upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv']; // Allowed media types
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // File type is allowed
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, MP4, and MKV are allowed.'));
    }
  },
});

// Submit RTI Report
router.post('/submit-rti', async (req, res) => {
  try {
    const { date, sector, description, location } = req.body;

    if (!date || !sector || !description || !location) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRTIReport = new RTIReport({
      date,
      sector,
      description,
      location,
    });

    await newRTIReport.save();
    res.status(200).json({ message: 'RTI Report submitted successfully', report: newRTIReport });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting RTI report', error: err.message });
  }
});

// Submit Public Service Report (with media upload)
router.post('/submit-public-service', upload.single('media'), async (req, res) => {
  try {
    const { date, sector, description, location } = req.body;
    const mediaPath = req.file ? req.file.path : null; // Get media file path

    if (!date || !sector || !description || !location) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!mediaPath) {
      return res.status(400).json({ message: 'Media file is required.' });
    }

    const newPublicServiceReport = new PublicServiceReport({
      date,
      sector,
      description,
      location,
      media: mediaPath,  // Save media path
    });

    await newPublicServiceReport.save();
    res.status(200).json({ message: 'Public Service Report submitted successfully', report: newPublicServiceReport });
  } catch (err) {
    console.error('Error submitting Public Service report:', err);
    res.status(500).json({ message: 'Error submitting Public Service report', error: err.message });
  }
});

// Get all RTI Reports (for Admin)
router.get('/rti-reports', async (req, res) => {
  console.log('GET /rti-reports hit');  // Add this for debugging
  try {
    const reports = await RTIReport.find();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching RTI reports', error: err.message });
  }
});


// Get all Public Service Reports (for Admin)
router.get('/public-service-reports', async (req, res) => {
  try {
    const reports = await PublicServiceReport.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching public service reports', error: err.message });
  }
});

// Get specific report by ID
router.get('/:reportId', async (req, res) => {
  const { reportId } = req.params;

  try {
    const report =
      (await RTIReport.findById(reportId)) ||
      (await PublicServiceReport.findById(reportId));
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching report', error: err.message });
  }
});

// Error handling for file upload
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

// Change this from PUT to PATCH
router.patch('/:reportType/:id/approve', async (req, res) => {
  const { reportType, id } = req.params;
  
  try {
    const report =
      reportType === 'rti-reports'
        ? await RTIReport.findByIdAndUpdate(id, { status: 'Approved' }, { new: true })
        : await PublicServiceReport.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (err) {
    console.error('Error approving report:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get approved RTI reports
router.get('/rti-reports/approved-reports', async (req, res) => {
  try {
    console.log('Fetching approved RTI reports...');
    const approvedRTIReports = await RTIReport.find({ status: 'Approved' });

    if (!approvedRTIReports || approvedRTIReports.length === 0) {
      return res.status(404).json({ message: 'No approved RTI reports found.' });
    }

    console.log('Approved RTI Reports:', approvedRTIReports);
    res.status(200).json({
      message: 'Approved RTI reports fetched successfully',
      data: approvedRTIReports,
    });
  } catch (error) {
    console.error('Error fetching approved RTI reports:', error.message);
    res.status(500).json({ message: 'Failed to fetch approved RTI reports.' });
  }
});


router.get('/public-service-reports/approved-reports', async (req, res) => {
  try {
    console.log('Fetching approved RTI reports...');
    const approvedPublicReports = await PublicServiceReport.find({ status: 'Approved' });

    if (!approvedPublicReports || approvedPublicReports.length === 0) {
      return res.status(404).json({ message: 'No approved RTI reports found.' });
    }

    console.log('Approved Public Reports:', approvedPublicReports);
    res.status(200).json({
      message: 'Approved public service reports fetched successfully',
      data: approvedPublicReports,
    });
  } catch (error) {
    console.error('Error fetching approved public service reports:', error.message);
    res.status(500).json({ message: 'Failed to fetch public service reports.' });
  }
});




export default router;
