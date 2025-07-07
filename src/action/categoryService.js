// src/services/categoryService.js
import axios from 'axios';

// Base URL for category endpoints
const API = axios.create({
  baseURL: 'http://localhost:3000/api/categories',
  withCredentials: true,
});

/**
 * Fetches all categories from the server.
 * @returns {Promise<Array>} An array of category objects { _id, name, ... }
 */
export async function fetchCategories() {
  const response = await API.get('/');
  return response.data;
}

export default {
  fetchCategories,
};
