import axios from 'axios';

const apiRest = axios.create({ baseURL: process.env.API_REST_URL });

export { apiRest };
