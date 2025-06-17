import { useCallback, useRef, useState } from 'react';
import { useRequestCategories } from './use-request-categories';

export const useRequestWithInfinityScroll = <T>(source: string) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, hasMore } = useRequestCategories<T>(
    source,
    page
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastNodeRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => ++prev);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  return { data, isLoading, error, hasMore, lastNodeRef };
};
