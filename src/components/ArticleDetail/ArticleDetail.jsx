import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './ArticleDetail.css';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="comment-header">
      <img 
        src={comment.user.profile_image_90} 
        alt={comment.user.name} 
        className="comment-avatar"
      />
      <div className="comment-meta">
        <span className="comment-author">{comment.user.name}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
    <div 
      className="comment-body"
      dangerouslySetInnerHTML={{ __html: comment.body_html }}
    />
  </div>
);

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        setLoading(true);
        const [articleData, commentsData] = await Promise.all([
          api.getArticleById(id),
          api.getArticleComments(id)
        ]);
        setArticle(articleData);
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [id]);

  if (loading) return <div className="content-loader"><div className="loader"></div></div>;
  if (error) return <div className="content-error">{error}</div>;
  if (!article) return <div className="content-error">Article not found</div>;

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
          <Link to={`/user/${article.user.username}`} className="author-link">
            <img 
              src={article.user.profile_image_90} 
              alt={article.user.name} 
              className="author-avatar"
            />
            <span>{article.user.name}</span>
          </Link>
          <span>• {new Date(article.published_at).toLocaleDateString()}</span>
          <span>• {article.reading_time_minutes} min read</span>
        </div>
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet</p>
        ) : (
          <div className="comments-list">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticleDetail; 