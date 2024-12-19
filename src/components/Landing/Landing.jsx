import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to DEV Articles Explorer</h1>
        <p className="landing-description">
          Discover amazing articles from the DEV Community. Stay updated with the latest
          in technology, programming, and software development.
        </p>
        <div className="landing-buttons">
          <Link to="/articles" className="landing-button primary">
            Browse Articles
          </Link>
          <a 
            href="https://dev.to" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-button secondary"
          >
            Visit DEV.to
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing; 