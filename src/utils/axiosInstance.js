import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const axiosInstance = axios.create({
  baseURL: 'https://local-baba-backend-production.up.railway.app/api/v1',
});

export const AxiosInterceptor = ({ children }) => {
  const { user, logout } = useAuth();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
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
        logout(); // Log out the user if unauthorized
      }
      return Promise.reject(error);
    }
  );

  return children;
};

export default axiosInstance;
