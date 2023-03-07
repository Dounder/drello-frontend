import axios from 'axios';

const apiGql = axios.create({ baseURL: process.env.API_GQL_URL });

export { apiGql };
