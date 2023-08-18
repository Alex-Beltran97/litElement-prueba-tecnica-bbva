import axios from 'axios';

const instance = ()=> axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const http = {
  get: (path: string)=> instance().get(path) 
};

export default http;