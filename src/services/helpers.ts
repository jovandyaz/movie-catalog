import { ClientAxiosInstance, ClientConfiguration } from './config';
import axios, { AxiosError, AxiosResponse } from 'axios';

const handleRequestResponse = (response: AxiosResponse) => {
  return response.data ? (response.data.data ?? response.data) : response;
};

const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

export const createAxiosInstance = (config: ClientConfiguration): ClientAxiosInstance => {
  const instance = axios.create(config);

  instance.interceptors.response.use(handleRequestResponse, handleRequestError);

  return instance;
};
