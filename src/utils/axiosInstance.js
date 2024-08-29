import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://api.localbaba.app/api/v1',
});

export const AxiosInterceptor = ({ children }) => {
  const { user } = useAuth();

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - 401', error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return children;
};

export default axiosInstance;
