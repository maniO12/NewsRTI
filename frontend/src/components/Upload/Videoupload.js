import React, { useState } from 'react';
import axios from 'axios';
import './Videoupload.css';

const UploadVideo = ({ fetchVideos }) => {
  const [title, setTitle] = useState('');
  const [runtime, setRuntime] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({}); // To store validation errors

  // Validate title: Must be non-empty and less than 200 characters
  const validateTitle = () => {
    if (!title) {
      return 'Title is required.';
    }
    if (title.length > 200) {
      return 'Title cannot exceed 200 characters.';
    }
    return '';
  };

  // Validate runtime: Must be in HH:MM:SS format
  const validateRuntime = () => {
    const runtimeRegex = /^\d{2}:\d{2}:\d{2}$/;
    if (!runtime) {
      return 'Runtime is required.';
    }
    if (!runtimeRegex.test(runtime)) {
      return 'Runtime must be in HH:MM:SS format.';
    }
    return '';
  };

  // Validate file inputs: Ensure both thumbnail and video files are selected
  const validateFiles = () => {
    if (!thumbnail) {
      return 'Thumbnail is required.';
    }
    if (!videoFile) {
      return 'Video file is required.';
    }
    return '';
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Run validations
    const titleError = validateTitle();
    const runtimeError = validateRuntime();
    const filesError = validateFiles();
  
    if (titleError || runtimeError || filesError) {
      setErrors({ title: titleError, runtime: runtimeError, files: filesError });
      return; // Stop form submission if validation fails
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('runtime', runtime);
    formData.append('thumbnail', thumbnail);
    formData.append('videoFile', videoFile);
  
    try {
      // Perform API call to upload video
      await axios.post('http://localhost:5000/api/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Show success alert only after the upload succeeds
      alert('Video uploaded successfully!');
      fetchVideos(); // Refresh the list after uploading a video
  
      // Reset form fields
      setTitle('');
      setRuntime('');
      setThumbnail(null);
      setVideoFile(null);
      setErrors({});
    } catch (err) {
      console.error('Error uploading video:', err);
      // Show failure alert only when an error occurs
      alert('Failed to upload video. Please try again.');
    }
  };
  
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      setThumbnail(files[0]);
    } else if (name === 'videoFile') {
      setVideoFile(files[0]);
    }
  };

  return (
    <div className="upload-page-container">
      <div className="upload-container">
        <h2>Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>

          <div>
            <label>Runtime (HH:MM:SS):</label>
            <input
              type="text"
              name="runtime"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              required
            />
            {errors.runtime && <div className="error">{errors.runtime}</div>}
          </div>

          <div>
            <label>Thumbnail:</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              required
            />
            {errors.files && <div className="error">{errors.files}</div>}
          </div>

          <div>
            <label>Video File:</label>
            <input
              type="file"
              name="videoFile"
              onChange={handleFileChange}
              required
            />
            {errors.files && <div className="error">{errors.files}</div>}
          </div>

          <button type="submit">Upload Video</button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
