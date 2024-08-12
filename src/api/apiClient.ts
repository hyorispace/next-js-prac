import axios from "axios";

const apiClient = axios.create({
  adapter: "fetch",
  baseURL: "/api",
});

export default apiClient;
