import axios from 'axios';

const BASE_URL = 'https://dev.to/api';

const api = {
  // Get random articles
  getRandomArticles: async (page = 1, per_page = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/random`, {
        params: {
          page,
          per_page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching random articles:', error);
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