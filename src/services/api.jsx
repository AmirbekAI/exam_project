import axios from 'axios';

const BASE_URL = 'https://dev.to/api';

const api = {
  // Get articles (modified to use the correct endpoint)
  getRandomArticles: async (page = 1, per_page = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          page,
          per_page,
          // Adding some parameters to get varied content
          state: 'rising',
          sort: 'published_at'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get article by ID
  getArticleById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/by_username?url=${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

export default api; 