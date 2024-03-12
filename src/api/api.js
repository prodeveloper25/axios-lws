import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000", timeout: 1000 });

const bearerToken = crypto.randomUUID();
// request interceptors
api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer" + bearerToken;
    console.log(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      // error came from server
      err.message = `Error from server: Status:${err.response.status} - Message:${err.response.statusText}`;
    }
    console.log(err);
    return Promise.reject(err);
  }
);

export default api;
