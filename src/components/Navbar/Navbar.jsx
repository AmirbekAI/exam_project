import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.searchArticles(query);
      // Extract unique authors from articles
      const authors = [...new Set(response.map(article => ({
        username: article.user.username,
        name: article.user.name,
        profile_image: article.user.profile_image
      })))];
      setSuggestions(authors.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setShowSuggestions(true);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      searchUsers(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSuggestionClick = (selectedUsername) => {
    navigate(`/user/${selectedUsername}`);
    setUsername('');
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/user/${username.trim()}`);
      setUsername('');
      setShowSuggestions(false);
    }
  };

  if (isHome) return null;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-logo">
          Dev.to Explorer
        </Link>
        <div className="nav-center" ref={searchRef}>
          <form onSubmit={handleSubmit} className="search-user-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search user..."
                value={username}
                onChange={handleInputChange}
                className="search-user-input"
              />
              {loading && <div className="search-spinner"></div>}
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((user) => (
                    <div
                      key={user.username}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(user.username)}
                    >
                      <img 
                        src={user.profile_image} 
                        alt={user.name} 
                        className="suggestion-avatar"
                      />
                      <div className="suggestion-info">
                        <span className="suggestion-name">{user.name}</span>
                        <span className="suggestion-username">@{user.username}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="search-user-button">
              Find User
            </button>
          </form>
        </div>
        <div className="nav-links">
          <Link to="/articles" className={`nav-link ${location.pathname === '/articles' ? 'active' : ''}`}>
            Articles
          </Link>
          <Link to="/podcasts" className={`nav-link ${location.pathname === '/podcasts' ? 'active' : ''}`}>
            Podcasts
          </Link>
          <Link to="/videos" className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`}>
            Videos
          </Link>
          <Link to="/organizations" className={`nav-link ${location.pathname === '/organizations' ? 'active' : ''}`}>
            Organizations
          </Link>
          <Link to="/reading-list" className={`nav-link ${location.pathname === '/reading-list' ? 'active' : ''}`}>
            Featured
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 