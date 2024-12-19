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
        setError(null);

        // Fetch user profile
        const userResponse = await api.getUserProfile(username);
        
        if (!userResponse || !userResponse.data) {
          throw new Error('User not found');
        }

        setUser(userResponse.data);

        // Fetch user's articles
        const articlesResponse = await api.getArticlesByUser(username);
        if (Array.isArray(articlesResponse)) {
          setArticles(articlesResponse);
        } else {
          setArticles([]);
        }

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message === 'User not found' 
          ? 'User not found' 
          : 'Failed to fetch user data. Please try again later.');
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
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="error">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="user-header">
        <img 
          src={user.profile_image || '/default-avatar.png'} 
          alt={user.name || username} 
          className="user-avatar"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <div className="user-info">
          <h1>{user.name || username}</h1>
          <p className="user-bio">{user.summary || 'No bio available'}</p>
          <div className="user-stats">
            <span>{user.following_count || 0} Following</span>
            <span>{user.followers_count || 0} Followers</span>
            <span>{articles.length} Articles</span>
          </div>
          {user.website_url && (
            <a 
              href={user.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="user-website"
            >
              Website
            </a>
          )}
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
                  <div className="article-image-container">
                    {article.cover_image ? (
                      <img 
                        src={article.cover_image} 
                        alt={article.title} 
                        className="article-image"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = `
                            <div class="article-image-placeholder">
                              <span>📝</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="article-image-placeholder">
                        <span>📝</span>
                      </div>
                    )}
                  </div>
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