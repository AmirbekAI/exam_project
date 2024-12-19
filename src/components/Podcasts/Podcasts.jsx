import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Podcasts.css';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [durationFilter, setDurationFilter] = useState('all');

  useEffect(() => {
    fetchPodcasts();
  }, [sortBy, durationFilter]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const data = await api.getPodcastEpisodes();
      setPodcasts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch podcasts');
    } finally {
      setLoading(false);
    }
  };

  const getDurationCategory = (duration) => {
    const minutes = Math.floor(duration / 60);
    if (minutes < 30) return 'short';
    if (minutes < 60) return 'medium';
    return 'long';
  };

  const filteredPodcasts = podcasts
    .filter(podcast => 
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(podcast => 
      durationFilter === 'all' || getDurationCategory(podcast.duration_in_seconds) === durationFilter
    )
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.published_at) - new Date(a.published_at);
      }
      if (sortBy === 'duration') {
        return b.duration_in_seconds - a.duration_in_seconds;
      }
      return 0;
    });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="podcasts-container">
      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-options">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="latest">Latest First</option>
            <option value="duration">Longest First</option>
          </select>
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Durations</option>
            <option value="short">Short ({"< "}30 min)</option>
            <option value="medium">Medium (30-60 min)</option>
            <option value="long">Long ({"> "}60 min)</option>
          </select>
        </div>
      </div>

      {filteredPodcasts.length === 0 ? (
        <div className="no-results">No podcasts found matching your search.</div>
      ) : (
        <div className="podcasts-grid">
          {filteredPodcasts.map((podcast) => (
            <div className="podcast-card" key={podcast.id}>
              <div className="podcast-image-container">
                {podcast.image_url ? (
                  <img 
                    src={podcast.image_url} 
                    alt={podcast.title} 
                    className="podcast-image"
                    onError={(e) => {
                      e.target.parentNode.innerHTML = `
                        <div class="podcast-image-placeholder">
                          <span>🎙️</span>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="podcast-image-placeholder">
                    <span>🎙️</span>
                  </div>
                )}
              </div>
              <div className="podcast-content">
                <h2>{podcast.title}</h2>
                <p>{podcast.description || 'No description available'}</p>
                <div className="podcast-meta">
                  <span>{Math.floor(podcast.duration_in_seconds / 60)} min</span>
                  <span>• {new Date(podcast.published_at).toLocaleDateString()}</span>
                </div>
                <a 
                  href={podcast.podcast_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="listen-button"
                >
                  Listen Now
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Podcasts; 