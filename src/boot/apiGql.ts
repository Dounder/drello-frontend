import axios from 'axios';
import { AuthData } from 'src/auth/interfaces/auth.interface';
import { apiRest } from './apiRest';

const apiGql = axios.create({ baseURL: process.env.API_GQL_URL });

const refreshToken = async (): Promise<AuthData> => {
  const token = sessionStorage.getItem('token');
  const { data } = await apiRest.get<AuthData>('/auth/refresh_token', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

apiGql.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

apiGql.interceptors.response.use(
  (response) => {
    console.log('gql response interceptor');
    return response;
  },
  () => refreshToken()
);

export { apiGql };
