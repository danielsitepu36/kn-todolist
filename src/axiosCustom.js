import axios from 'axios';

const baseURL = 'https://appgwdev.kalbenutritionals.com/api/training/api';

const AxiosTraining = axios.create({
  baseURL,
});

const interceptRequest = (axios) =>
  axios.interceptors.request.use(
    (config) => {
      let headers = { ...config.headers };
      const token = JSON.parse(localStorage.getItem('reactData'));
      if (token)
        headers = {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
        };
      config.headers = headers;
      return config;
    },
    (error) => Promise.reject(error)
  );

interceptRequest(AxiosTraining);
export default AxiosTraining;
