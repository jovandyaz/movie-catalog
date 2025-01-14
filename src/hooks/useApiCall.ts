'use client';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiCallResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  invoke: (url: string, config?: AxiosRequestConfig) => Promise<T>;
  reset: () => void;
}

interface UseApiCallConfig extends AxiosRequestConfig {
  immediate?: boolean;
}

export const useApiCall = <T = unknown>(
  initialUrl: string,
  initialConfig?: UseApiCallConfig
): ApiCallResult<T> => {
  if (typeof initialUrl !== 'string' || initialUrl.trim() === '') {
    throw new Error('Initial URL must be a non-empty string.');
  }

  const [url, setUrl] = useState(initialUrl);
  const [config, setConfig] = useState<UseApiCallConfig>({
    ...initialConfig,
    immediate: initialConfig?.immediate ?? false
  });
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialConfig?.immediate ?? false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        url,
        ...config
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      throw axiosError;
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  const invoke = useCallback(
    async (newUrl: string, newConfig?: AxiosRequestConfig) => {
      setUrl(newUrl);
      setConfig(prevConfig => ({
        ...prevConfig,
        ...newConfig
      }));
      return fetchData();
    },
    [fetchData]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (config.immediate) {
      fetchData().catch(err => {
        console.error('Error in useApiCall effect:', err);
      });
    }
  }, [fetchData, config.immediate]);

  return {
    data,
    loading,
    error,
    invoke,
    reset
  };
};
