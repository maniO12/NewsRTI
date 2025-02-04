import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Newswatch.css';

const FullArticle = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams(); // Get the article ID from the URL

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="full-article">
      <h1>{article.title}</h1>
      <div className="article-content">
        <p>{article.content}</p> {/* Full article content */}
        {article.media && (article.media.includes('.jpg') || article.media.includes('.jpeg') || article.media.includes('.png')) ? (
          <img src={`http://localhost:5000/${article.media}`} alt={article.title} />
        ) : article.media && article.media.includes('.mp4') ? (
          <video controls>
            <source src={`http://localhost:5000/${article.media}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
    </div>
  );
};

export default FullArticle;
