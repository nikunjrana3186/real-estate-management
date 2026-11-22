import axios from 'axios';

// One shared Axios instance. The URL comes from the VITE_API_URL env variable.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000, // free hosts can be slow to wake up
});

// Turn any error into a readable message
export const getErrorMessage = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (data?.errors?.length) return data.errors.map((e) => e.message).join(', ');
    return data?.message || 'Something went wrong';
  }
  if (error.code === 'ECONNABORTED') return 'The server took too long to respond. Please try again.';
  return 'Cannot reach the server. Check your connection or API URL.';
};

export default api;
