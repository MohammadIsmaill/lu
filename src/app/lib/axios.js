import axios from "axios";

const axiosConfig = {
  baseURL: " https://lu-backend-10f6a44280bf.herokuapp.com/api/v1",
  timeout: 15000,
};

const authenticatedAxios = axios.create(axiosConfig);

authenticatedAxios.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      request.headers.authorization = `Bearer ${token}`;
      return request;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  (error) => {
    console.log("Client Error: Sending request unsuccessful");
    return Promise.reject(error);
  }
);
authenticatedAxios.interceptors.response.use(
  (response) => {
    console.log("Server: response arrived successfully");
    return response;
  },
  (error) => {
    console.log("Server: response unsuccessful");
    return Promise.reject(error);
  }
);

export default authenticatedAxios;
