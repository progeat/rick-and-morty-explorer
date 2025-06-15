import { useCallback, useState } from 'react';

type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Options<T> {
  method?: MethodType;
  body?: T;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async (url: string) => {
    url = `${baseUrl}/${url}`;

    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const responseData = await response.json();

      setData(responseData as T);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message || 'Ошибка запроса сервера');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestOtherMethods = useCallback(
    async (url: string, options: Options<T>) => {
      url = `${baseUrl}/${url}`;

      try {
        setError(null);
        setIsLoading(true);

        const headers: HeadersInit = {};
        if (options.body && typeof options.body !== 'string') {
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {
          method: options.method ?? 'POST',
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const responseData = await response.json();

        setData(responseData as T);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message || 'Ошибка запроса сервера');
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    data,
    isLoading,
    error,
    get,
    post: (url: string, body: T) =>
      requestOtherMethods(url, { method: 'POST', body }),
    put: (url: string, body: T) =>
      requestOtherMethods(url, { method: 'PUT', body }),
    patch: (url: string, body: T) =>
      requestOtherMethods(url, { method: 'PATCH', body }),
    delete: (url: string) => requestOtherMethods(url, { method: 'DELETE' }),
  };
};
