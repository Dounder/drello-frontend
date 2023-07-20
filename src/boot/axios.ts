import axios from 'axios';
import { Cookies } from 'quasar';
import { useConfig } from 'src/shared/composables';

const { API_URL } = useConfig();

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export { api };
