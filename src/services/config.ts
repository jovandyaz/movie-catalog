import { AxiosRequestConfig } from 'axios';

export type ClientConfiguration = AxiosRequestConfig;
export type ClientResponse<T> = T;
export type RequestBody = Record<string, unknown> | unknown[] | undefined;

export interface ClientAxiosInstance {
  get<TResponse>(url: string, config?: ClientConfiguration): Promise<ClientResponse<TResponse>>;

  post<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    config?: ClientConfiguration
  ): Promise<ClientResponse<TResponse>>;

  put<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    config?: ClientConfiguration
  ): Promise<ClientResponse<TResponse>>;

  delete<TResponse>(url: string, config?: ClientConfiguration): Promise<ClientResponse<TResponse>>;

  patch<TResponse, TData extends RequestBody = RequestBody>(
    url: string,
    data?: TData,
    config?: ClientConfiguration
  ): Promise<ClientResponse<TResponse>>;
}

const coreApiConfig: ClientConfiguration = {
  headers: { 'Content-Type': 'application/json' }
};

export { coreApiConfig };
