import axios from 'axios';
import { useConfig } from 'src/shared/composables';

const { API_URL } = useConfig();

const api = axios.create({ baseURL: API_URL });

export { api };
