// routes/NewsUpload.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import News from '../models/News.js';  

const router = express.Router();


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


router.post('/', upload.single('media'), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }


    const mediaPath = req.file?.path;

    if (!mediaPath) {
      return res.status(400).json({ message: 'Media file is required.' });
    }

    const newNews = new News({
      title,
      content,
      media: mediaPath,  
    });

    await newNews.save();
    res.status(200).json({ message: 'News posted successfully', news: newNews });
  } catch (err) {
    res.status(500).json({ message: 'Error posting news', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const news = await News.find();  
    res.status(200).json(news);  
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news', error: err.message });
  }
});


router.get('/:newsId', (req, res) => {
  const { newsId } = req.params;

  News.findById(newsId)
    .then(news => {
      if (!news) {
        return res.status(404).send({ message: 'News item not found' });
      }
      res.json(news);
    })
    .catch(err => {
      console.error('Error fetching news:', err);
      res.status(500).send({ message: 'Server error' });
    });
});


router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

export default router;
