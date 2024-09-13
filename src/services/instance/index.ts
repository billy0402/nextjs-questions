import axios from 'axios';

import { BASE_API_URL } from '@/fixtures/constants';

const instance = axios.create({
  baseURL: BASE_API_URL,
});

export default instance;
