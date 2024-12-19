import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './ReadingList.css';

const ReadingList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles({
        state: 'rising',
        per_page: 30,
        top: 'week'
      });
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch featured articles');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reading-list-container">
      <h1>Featured Articles</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search featured articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <div className="content-loader">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="content-error">{error}</div>
      ) : (
        <div className="reading-list-grid">
          {filteredArticles.length === 0 ? (
            <div className="no-results">No articles found.</div>
          ) : (
            filteredArticles.map((article) => (
              <Link 
                to={`/article/${article.id}`} 
                key={article.id} 
                className="article-link"
              >
                <article className="article-card">
                  {article.cover_image && (
                    <img 
                      src={article.cover_image} 
                      alt={article.title} 
                      className="article-image"
                    />
                  )}
                  <div className="article-content">
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <div className="article-meta">
                      <span>By {article.user.name}</span>
                      <span>• {new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingList; 