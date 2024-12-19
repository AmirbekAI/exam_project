import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: '📚',
      title: 'Articles',
      description: 'Read insightful articles from the dev community',
      link: '/articles'
    },
    {
      icon: '🎙️',
      title: 'Podcasts',
      description: 'Listen to tech talks and discussions',
      link: '/podcasts'
    },
    {
      icon: '🎥',
      title: 'Videos',
      description: 'Watch tutorials and coding sessions',
      link: '/videos'
    }
  ];

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-content">
          <h1>
            <span className="gradient-text">Explore</span> the World of
            <span className="gradient-text"> Development</span>
          </h1>
          <p className="landing-description">
            Your gateway to the best tech content from the dev.to community. 
            Discover articles, videos, and podcasts that help you grow as a developer.
          </p>
          <div className="landing-cta">
            <Link to="/articles" className="cta-button primary">
              Start Exploring
            </Link>
            <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
              Visit Dev.to
            </a>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Everything You Need</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <Link to={feature.link} key={feature.title} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="landing-footer">
        <p>Built with ❤️ for the dev community</p>
      </div>
    </div>
  );
};

export default Landing; 