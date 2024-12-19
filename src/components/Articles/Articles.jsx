import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [timeFilter, setTimeFilter] = useState('fresh');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchArticles();
  }, [selectedTag, timeFilter]);

  const fetchTags = async () => {
    try {
      const data = await api.getTags();
      setTags(data.slice(0, 10)); // Get top 10 tags
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let data;
      
      if (timeFilter === 'trending') {
        data = await api.getTrendingArticles('week');
      } else if (selectedTag) {
        data = await api.getArticlesByTag(selectedTag);
      } else {
        data = await api.getArticles({
          state: timeFilter,
          per_page: 15
        });
      }
      
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="articles-container">
      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-options">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="fresh">Latest</option>
            <option value="rising">Rising</option>
            <option value="trending">Trending</option>
          </select>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="filter-select"
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="no-results">No articles found matching your search.</div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <Link 
              to={`/article/${article.id}`}
              className="article-link"
              key={article.id}
            >
              <article className="article-card">
                <div className="article-image-container">
                  {article.cover_image ? (
                    <img 
                      src={article.cover_image} 
                      alt={article.title} 
                      className="article-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="article-image-placeholder">
                      <span>No image available</span>
                    </div>
                  )}
                </div>
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p>{article.description || 'No description available'}</p>
                  <div className="article-meta">
                    <span>By {article.user.name}</span>
                    <span>• {new Date(article.published_at).toLocaleDateString()}</span>
                    <span>• {article.reading_time_minutes || '?'} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
