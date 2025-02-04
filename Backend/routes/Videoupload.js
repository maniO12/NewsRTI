// routes/Videoupload.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Video from '../models/Video.js';

const router = express.Router();

// Multer setup with file type restrictions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, MP4, and MKV are allowed.'));
    }
  },
});

// Video upload route
router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'videoFile' }]), async (req, res) => {
  try {
    const { title, runtime } = req.body;

    if (!title || !runtime) {
      return res.status(400).json({ message: 'Title and runtime are required.' });
    }

    const thumbnailPath = req.files?.thumbnail?.[0]?.path;
    const videoPath = req.files?.videoFile?.[0]?.path;

    if (!thumbnailPath || !videoPath) {
      return res.status(400).json({ message: 'Thumbnail and video file are required.' });
    }

    const newVideo = new Video({
      title,
      runtime,
      thumbnail: thumbnailPath,
      videoFile: videoPath,
    });

    await newVideo.save();
    res.status(200).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading video', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();  // Fetch all videos from the database
    res.status(200).json(videos);  // Return videos as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
});

router.get('/:videoId', (req, res) => {
  const { videoId } = req.params;

  Video.findById(videoId)
    .then(video => {
      if (!video) {
        return res.status(404).send({ message: 'Video not found' });
      }
      res.json(video);
    })
    .catch(err => {
      console.error('Error fetching video:', err);
      res.status(500).send({ message: 'Server error' });
    });
});



// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

export default router;
