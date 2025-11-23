import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // cookie/token send ke liye
});

export default API;
