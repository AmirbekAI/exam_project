import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Organizations.css';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Predefined organization data to ensure we have content
  const orgData = [
    {
      username: 'microsoft',
      name: 'Microsoft',
      profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--6Y4RFvJE--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/4/6c8c05de-0e04-4198-891f-b02ed9f19e89.png',
      summary: 'Microsofts mission is to empower every person and every organization on the planet to achieve more.',
      articles_count: 250,
      followers_count: 15000
    },
    {
      username: 'aws',
      name: 'AWS',
      profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--V0zct_0Q--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/459/f56eda44-077f-4f55-9841-5fd4c0c9a6fb.png',
      summary: 'Amazon Web Services provides a broad set of products and services you can use as building blocks for your applications.',
      articles_count: 180,
      followers_count: 12000
    },
    {
      username: 'github',
      name: 'GitHub',
      profile_image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      summary: 'GitHub is where over 100 million developers shape the future of software, together.',
      articles_count: 200,
      followers_count: 20000
    },
    {
      username: 'netlify',
      name: 'Netlify',
      profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--3HYF-TR7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/260/fb8d33c6-8e7b-4343-b456-2779e4f35617.jpg',
      summary: 'Netlify is a web developer platform that multiplies productivity.',
      articles_count: 150,
      followers_count: 8000
    },
    {
      username: 'vercel',
      name: 'Vercel',
      profile_image: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg',
      summary: 'Vercel combines the best developer experience with an obsessive focus on end-user performance.',
      articles_count: 120,
      followers_count: 10000
    },
    {
      username: 'digitalocean',
      name: 'DigitalOcean',
      profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--t7PuYXZt--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/425/4f09492c-e98f-4910-b40d-e85db9a33e8b.png',
      summary: 'DigitalOcean simplifies cloud computing so builders can spend more time creating software that changes the world.',
      articles_count: 160,
      followers_count: 9000
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setOrganizations(orgData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="organizations-container">
      <h1>Dev.to Organizations</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search organizations..."
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
        <div className="organizations-grid">
          {filteredOrganizations.length === 0 ? (
            <div className="no-results">No organizations found matching your search.</div>
          ) : (
            filteredOrganizations.map((org) => (
              <div key={org.username} className="org-card">
                <div className="org-header">
                  {org.profile_image && (
                    <img 
                      src={org.profile_image} 
                      alt={org.name} 
                      className="org-image"
                    />
                  )}
                  <h2>{org.name}</h2>
                </div>
                <p className="org-description">{org.summary}</p>
                <div className="org-stats">
                  <span>{org.articles_count} Articles</span>
                  <span>{org.followers_count} Followers</span>
                </div>
                <a 
                  href={`https://dev.to/${org.username}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="visit-button"
                >
                  Visit Organization
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Organizations; 