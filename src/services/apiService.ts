import axios from 'axios';
import { getObject } from '../store/storage';
import config from '../utils/config/config';

let showSnackbar: ((message: string, type: 'success' | 'error') => void) | null = null;

export const setSnackbarHandler = (
  handler: (message: string, type: 'success' | 'error') => void
) => {
  showSnackbar = handler;
};

// Criando uma instância do Axios
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getObject('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data.message && showSnackbar) {
      showSnackbar(response.data.message, 'success');
    }
    return response;
  },
  (error) => {
    if (showSnackbar) {
      if (error.response?.data) {
        showSnackbar(error.response.data.error || 'Tente mais tarde', 'error');
      } else {
        showSnackbar('Tente mais tarde', 'error');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
