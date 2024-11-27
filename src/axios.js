import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Dynamically read from .env
});

export default instance;
