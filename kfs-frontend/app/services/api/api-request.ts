import axios from "axios";

/**
 * Helper function for API requests.
 * Handles generic error messaging and returns JSON response.
 */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default api;

