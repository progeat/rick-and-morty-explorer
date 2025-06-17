import { useCallback, useState } from 'react';

type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Options<T> {
  method?: MethodType;
  body?: T;
}

const baseUrlUsers = import.meta.env.VITE_API_USERS_URL;
const baseUrlData = import.meta.env.VITE_API_URL;

export const useFetch = <T>(type: 'data' | 'users') => {
  const baseUrl = type === 'data' ? baseUrlData : baseUrlUsers;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (url: string, options: Options<T>) => {
      url = `${baseUrl}/${url}`;

      try {
        setError(null);
        setIsLoading(true);

        const headers: HeadersInit = { 'Content-Type': 'application/json' };

        const response = await fetch(url, {
          method: options.method ?? 'GET',
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const responseData = await response.json();

        setData(responseData as T);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message || 'Server request error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const get = useCallback(
    (url: string) => fetchData(url, { method: 'GET' }),
    [fetchData]
  );
  const post = useCallback(
    (url: string, body: T) => fetchData(url, { method: 'POST', body }),
    [fetchData]
  );
  const put = useCallback(
    (url: string, body: T) => fetchData(url, { method: 'PUT', body }),
    [fetchData]
  );
  const patch = useCallback(
    (url: string, body: T) => fetchData(url, { method: 'PATCH', body }),
    [fetchData]
  );
  const remove = useCallback(
    (url: string) => fetchData(url, { method: 'DELETE' }),
    [fetchData]
  );

  return {
    data,
    isLoading,
    error,
    get,
    post,
    put,
    patch,
    delete: remove,
  };
};
