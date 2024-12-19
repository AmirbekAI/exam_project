import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Podcasts.css';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const data = await api.getPodcastEpisodes();
      setPodcasts(data);
    } catch (err) {
      setError('Failed to fetch podcasts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="podcasts-container">
      <h1>Dev.to Podcasts</h1>
      <div className="podcasts-grid">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            {podcast.image_url && (
              <img src={podcast.image_url} alt={podcast.title} className="podcast-image" />
            )}
            <div className="podcast-content">
              <h2>{podcast.title}</h2>
              <p>{podcast.description}</p>
              <div className="podcast-meta">
                <span>{new Date(podcast.published_at).toLocaleDateString()}</span>
                <a href={podcast.podcast_url} target="_blank" rel="noopener noreferrer" className="listen-button">
                  Listen Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts; 