import { toast } from 'react-toastify';
import axios from 'axios';

const instanse = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

instanse.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${window.localStorage.getItem(
      'token',
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instanse.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 403 && message !== 'Email not verified') {
      localStorage.removeItem('token');

      if (
        !['/auth/login', '/auth/register'].includes(window.location.pathname)
      ) {
        window.location.href = '/auth/login';
      }
    }

    if (message && status !== 403) {
      toast.error(message || 'Error');
    }

    return Promise.reject(error);
  },
);

export default instanse;
