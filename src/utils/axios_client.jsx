import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
});

axiosClient.interceptors.request.use((config) => {
  // Add a token to the headers
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Remove the token from the headers
    return response;
  },
  (error) => {
    // Handle the error
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
  }
);

export default axiosClient;
