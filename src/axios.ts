import axios from 'axios';
import { toast } from 'react-toastify';

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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('token');
      if (
        !['/auth/login', '/auth/register'].includes(window.location.pathname)
      ) {
        window.location.href = '/auth/login';
      }
    }
    if (error.response && error.response.status !== 403) {
      toast.error(error?.response?.data?.message || 'Error');
    }
    return Promise.reject(error);
  },
);

export default instanse;
