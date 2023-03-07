import axios from 'axios';
import useAuth from 'src/auth/composables/useAuth';
import { AuthData } from 'src/auth/interfaces/auth.interface';
import { getJWTExpireDate, getTimeRemaining } from 'src/shared/helpers';

const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

api.interceptors.response.use((response) => {
  const token = sessionStorage.getItem('token');

  if (!token) return response;

  const exp = getJWTExpireDate(token);

  const { total } = getTimeRemaining(exp ?? new Date());

  // 300000 ms = 5 minutes
  if (total <= 300000) refreshToken(token);

  return response;
});

const refreshToken = async (token: string) => {
  const { data } = await api.get<AuthData>('/auth/refresh_token', {
    headers: { Authorization: `Bearer ${token}` },
  });
  useAuth().store.setAuthData(data);
};

export { api, axios };
