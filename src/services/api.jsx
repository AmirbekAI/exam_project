import axios from 'axios';

const BASE_URL = 'https://dev.to/api';

const api = {
  // Get articles with various filters
  getArticles: async ({
    page = 1,
    per_page = 10,
    tag = '',
    username = '',
    state = 'fresh',
    top = 0
  } = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          page,
          per_page,
          tag,
          username,
          state,
          top: top || undefined
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get trending articles
  getTrendingArticles: async (period = 'week') => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          state: 'rising',
          per_page: 10,
          top: period // week, month, year, infinity
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending articles:', error);
      throw error;
    }
  },

  // Get articles by tag
  getArticlesByTag: async (tag, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          tag,
          page,
          per_page: 10
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles by tag:', error);
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

  // Get tags
  getTags: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/by_username`, {
        params: {
          username: username
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Get user's articles
  getUserArticles: async (username, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          username: username,
          page: page,
          per_page: 30
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user articles:', error);
      throw error;
    }
  },

  // Get podcast episodes
  getPodcastEpisodes: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/podcast_episodes`, {
        params: {
          page,
          per_page: 12
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      throw error;
    }
  },

  // Get organization details
  getOrganization: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/organizations/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  },

  // Get article comments
  getArticleComments: async (articleId) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments`, {
        params: {
          a_id: articleId
        }
      });
      return response.data || []; // Ensure we always return an array
    } catch (error) {
      console.error('Error fetching comments:', error);
      return []; // Return empty array on error
    }
  },

  // Get comment thread
  getCommentThread: async (commentId) => {
    return axios.get(`${BASE_URL}/comments/${commentId}`);
  },

  // Get reading list articles
  getReadingList: async (page = 1, per_page = 30) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/me/bookmarks`, {
        headers: {
          'api-key': import.meta.env.VITE_DEVTO_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reading list:', error);
      throw error;
    }
  },

  // Search articles
  searchArticles: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/search`, {
        params: {
          q: query,
          page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  },

  // Get latest articles from specific tags
  getArticlesByTags: async (tags, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          tag: tags.join(','),
          page,
          per_page: 12
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles by tags:', error);
      throw error;
    }
  },

  // Get video articles
  getVideoArticles: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          page,
          per_page: 12,
          tag: 'video'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching video articles:', error);
      throw error;
    }
  },

  // Get articles with different filters
  getLatestArticles: async () => {
    return axios.get(`${BASE_URL}/articles/latest`);
  },

  // Get articles by popularity
  getTopArticles: async (period = 'week') => { // period: week, month, year, infinity
    return axios.get(`${BASE_URL}/articles/top/${period}`);
  },

  // Get articles by tag with additional params
  getArticlesByTag: async (tag, params = {}) => {
    return axios.get(`${BASE_URL}/articles?tag=${tag}`, { params });
  },

  // Get articles by username
  getArticlesByUser: async (username) => {
    return axios.get(`${BASE_URL}/articles?username=${username}`);
  },

  // Get popular tags
  getPopularTags: async () => {
    return axios.get(`${BASE_URL}/tags`);
  },

  // Get tag details
  getTagInfo: async (tagName) => {
    return axios.get(`${BASE_URL}/tags/${tagName}`);
  },

  // Get listings (job posts, events, etc.)
  getListings: async (category = 'all') => {
    return axios.get(`${BASE_URL}/listings?category=${category}`);
  },

  // Get specific listing
  getListing: async (listingId) => {
    return axios.get(`${BASE_URL}/listings/${listingId}`);
  }
};

export default api; 