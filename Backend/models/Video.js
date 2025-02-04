import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
      maxlength: 200, // Maximum length for the title
    },
    runtime: {
      type: String, // Use "Number" if runtime is stored in seconds
      required: true,
      validate: {
        validator: function (v) {
          // Optional: Check for a format like HH:MM:SS
          return /^\d{2}:\d{2}:\d{2}$/.test(v);
        },
        message: 'Runtime must be in the format HH:MM:SS.',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png)$/i.test(v); // Validate common image file extensions
        },
        message: 'Thumbnail must be a valid image file (JPG, JPEG, or PNG).',
      },
    },
    videoFile: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\.(mp4|mkv)$/i.test(v); // Validate common video file extensions
        },
        message: 'Video file must be a valid video file (MP4 or MKV).',
      },
    },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
