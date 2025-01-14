import { ClientConfiguration } from '../config';
import { createAxiosInstance } from '../helpers';
import { tmdbApiUrl } from './urls';
import { env } from '@/config';

const movieClientConfig: ClientConfiguration = {
  baseURL: tmdbApiUrl,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${env.tmdbApiKey}`
  }
};

export default createAxiosInstance(movieClientConfig);
