import axios from 'axios';
import { Cookies } from 'quasar';
import { useConfig } from 'src/shared/composables';

const { API_URL } = useConfig();

const api = axios.create({ baseURL: API_URL });

const removeAllCookies = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  Cookies.remove('login');
};

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status == 200 && response.data.errors) {
      console.log(response.data.errors);
      removeAllCookies();
    }

    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeAllCookies();
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export { api };
