import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Dev.to Explorer</h1>
        <p className="landing-description">
          Discover the best articles, videos, podcasts, and discussions from the dev.to community.
        </p>
        <div className="landing-buttons">
          <Link to="/articles" className="landing-button primary">
            Browse Articles
          </Link>
          <Link to="/podcasts" className="landing-button secondary">
            Listen Podcasts
          </Link>
          <Link to="/videos" className="landing-button secondary">
            Watch Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing; 