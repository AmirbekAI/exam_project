import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // First get the user profile
        const userResponse = await api.getUserProfile(username);
        if (userResponse && userResponse.data) {
          setUser(userResponse.data);
          
          // Then get their articles
          const articlesResponse = await api.getUserArticles(username);
          setArticles(articlesResponse);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="content-loader">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-container">
        <div className="content-error">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="content-error">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="user-header">
        <img 
          src={user.profile_image || 'https://via.placeholder.com/150'} 
          alt={user.name || username} 
          className="user-avatar" 
        />
        <div className="user-info">
          <h1>{user.name || username}</h1>
          <p className="user-bio">{user.summary || 'No bio available'}</p>
          <div className="user-stats">
            <span>{user.following_count || 0} Following</span>
            <span>{user.followers_count || 0} Followers</span>
            <span>{articles.length} Articles</span>
          </div>
        </div>
      </div>

      <div className="user-articles">
        <h2>Latest Articles</h2>
        <div className="articles-grid">
          {articles.length === 0 ? (
            <div className="no-articles">No articles found</div>
          ) : (
            articles.map((article) => (
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
                    <h3>{article.title}</h3>
                    <p>{article.description || 'No description available'}</p>
                    <div className="article-meta">
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                      <span>• {article.reading_time_minutes || '?'} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 