// components/WatchVideo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Watch.css';
const WatchVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
        setVideo(response.data);
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };

    fetchVideo();
  }, [videoId]);

  return (
    <div className="displaysection">
    
    {video ? (
      <div className="mainvideo">
        <h1>{video.title}</h1>
        <video width="100%" controls>
          <source
            src={`http://localhost:5000/${video.videoFile}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    ) : (
      <p>Loading video...</p>
    )}
  </div>
  );
};

export default WatchVideo;
