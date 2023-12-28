import axios from 'axios';

const client = axios.create({
  baseURL: 'http://13.209.17.72:8080',
});

export default client;
