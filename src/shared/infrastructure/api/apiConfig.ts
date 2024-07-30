import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Importa expo-secure-store

const baseURL = 'https://liosftwr.space/api/v1/';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error retrieving access token from SecureStore:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
