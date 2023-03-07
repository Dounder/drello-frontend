import axios from 'axios';

const apiRest = axios.create({ baseURL: process.env.API_REST_URL });
const apiGql = axios.create({ baseURL: process.env.API_GQL_URL });

export { apiRest, apiGql };
