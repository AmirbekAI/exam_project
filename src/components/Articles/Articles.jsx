import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Articles.css';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getRandomArticles(1, 10);
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="articles-container">
      {articles.map((article) => (
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
                <span>• {article.reading_time_minutes} min read</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Articles; 