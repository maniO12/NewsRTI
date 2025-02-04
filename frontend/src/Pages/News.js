import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsList, setNewsList] = useState([]);

  // Fetch news on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/news') // Ensure the endpoint is correct
      .then(response => {
        console.log('News fetched:', response.data); // Log the fetched news

        // Sort news by creation date in descending order (newest first)
        const sortedNews = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNewsList(sortedNews); // Set the sorted news in state
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="news-grid">
    <p className="encourage">
     Our platform offers articles that cover a wide range of topics, from political analysis to public affairs.
      Stay informed about government policies and the Right to Information (RTI) Act to empower your civic participation.
    </p>
  
    <div className="news-list">
      {newsList.length > 0 ? (
        newsList.map((news, index) => (
          <div
            key={news._id}
            className={`news-card ${index % 2 === 0 ? 'first' : 'second'}`} // Add a class to alternate between the two cards in the row
          >
            <div className="thumbnail">
              {/* Check if the media is an image or video */}
              {news.media && (news.media.includes('.jpg') || news.media.includes('.jpeg') || news.media.includes('.png')) ? (
                <img src={`http://localhost:5000/${news.media}`} alt={news.title} />
              ) : news.media && news.media.includes('.mp4') ? (
                <video controls>
                  <source src={`http://localhost:5000/${news.media}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
            <div className="news-info">
              <h3>{news.title}</h3>
              <p>{news.content.slice(0, 150)}...</p> {/* Show a truncated preview */}
              <Link to={`/news/${news._id}`} className="read-more-button">Read More</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  </div>
  
  );
};

export default News;



