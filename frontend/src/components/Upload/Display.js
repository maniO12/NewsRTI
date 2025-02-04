import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Display.css';

const Display = () => {
  const [videos, setVideos] = useState([]); // Original video list from API
  const [filteredVideos, setFilteredVideos] = useState([]); // Videos filtered by search
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Fetch videos on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(response => {
        console.log('Videos fetched:', response.data);

        // Sort videos by creation date (newest first)
        const sortedVideos = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setVideos(sortedVideos); // Set the videos in state
        setFilteredVideos(sortedVideos); // Initially show all videos
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter videos based on the search query (case-insensitive)
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(query)
    );
    setFilteredVideos(filtered);
  };

  return (
    <div className="video-grid">
      {/* Search Bar */}
      <h6 className="factcheck">#Fact Check, Analyze Government schemes, Political Literacy</h6>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

     

      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div key={video._id} className="video-card">
              <div className="thumbnail">
                <img src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>Runtime: {video.runtime}</p>
                <Link to={`/watch/${video._id}`} className="watch-button">Watch</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default Display;
