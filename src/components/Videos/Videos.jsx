import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await api.getVideoArticles();
      setVideos(data);
    } catch (err) {
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="videos-container">
      <h1>Dev.to Videos</h1>
      {loading ? (
        <div className="content-loader">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="content-error">{error}</div>
      ) : (
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              {video.cover_image && (
                <div className="video-thumbnail">
                  <img src={video.cover_image} alt={video.title} />
                  <div className="play-overlay">▶</div>
                </div>
              )}
              <div className="video-content">
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                <div className="video-meta">
                  <span>By {video.user.name}</span>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="watch-button">
                    Watch Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos; 