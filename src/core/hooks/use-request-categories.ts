import { useCallback, useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_URL;

export const useRequestCategories = <T>(source: string, page: number) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!hasMore) return;

      const response = await fetch(`${baseUrl}/${source}?page=${page}`);

      if (!response.ok) {
        console.error(`Error: Data request error`);
        throw new Error(`Error: Data request error`);
      }

      const dataResponse = await response.json();

      if (dataResponse?.results) {
        setData((prev) => [...prev, ...dataResponse.results]);
      }

      if (!dataResponse?.info?.next) {
        setHasMore(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [source, page, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, hasMore };
};
