import axios from 'axios';
import { Cookies } from 'quasar';
import { boot } from 'quasar/wrappers';
import { AuthResponse } from 'src/auth/interfaces/auth.interface';
import { useAuthStore } from 'src/auth/store/auth.store';
import { useConfig, useDecrypt } from 'src/shared/composables';

const { API_URL } = useConfig();
const { decryptCredentials } = useDecrypt();

const api = axios.create({ baseURL: API_URL });

const removeAllCookies = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  Cookies.remove('login');
};

const login = async (): Promise<AuthResponse> => {
  const loginCookie = Cookies.get('login') as { user: string; pass: string };

  const { decryptedPassword, decryptedUsername } = decryptCredentials(loginCookie.user, loginCookie.pass);
  const { data } = await api.post<AuthResponse>('/auth/sign_in', {
    username: decryptedUsername,
    password: decryptedPassword,
  });

  return data;
};

export default boot(async ({ store }) => {
  const authStore = useAuthStore(store);

  api.interceptors.request.use((config) => {
    const token = Cookies.get('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      if (response.data.errors) {
        const error: string = response.data.errors[0].message;

        if (error.includes('Unauthorized'))
          login()
            .then((data) => {
              Cookies.set('token', data.token, { expires: 365 });
              Cookies.set('user', JSON.stringify(data.user), { expires: 365 });
              authStore.setCredentials(data);
            })
            .catch(() => {
              removeAllCookies();
              window.location.href = '/#/auth';
            });

        return api.request(response.config);
      }
      return response;
    },
    (error) => {
      if (error.response.status === 500) {
        removeAllCookies();
        window.location.href = '/#/auth';
      }

      return Promise.reject(error);
    }
  );
});

export { api };
