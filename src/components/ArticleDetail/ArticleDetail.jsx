import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await api.getArticleById(id);
        setArticle(data);
      } catch (err) {
        setError('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Article not found</div>;

  return (
    <div className="article-detail">
      <Link to="/articles" className="back-button">← Back to Articles</Link>
      <article>
        {article.cover_image && (
          <img 
            src={article.cover_image} 
            alt={article.title} 
            className="article-detail-image"
          />
        )}
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>By {article.user.name}</span>
          <span>• {new Date(article.published_at).toLocaleDateString()}</span>
          <span>• {article.reading_time_minutes} min read</span>
        </div>
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      </article>
    </div>
  );
};

export default ArticleDetail; 