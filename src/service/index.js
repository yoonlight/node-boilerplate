import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3003/api/' });

const google = {
  search: (query) =>
    instance.get(`search/google?query=${encodeURIComponent(query)}`),
};

const api = {
  google,
};

export default api;
