import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { HeroModel } from '@/shared/types';
import { HeroList } from '@/features/hero/ui/hero-list';
import { ControlPanel } from '@/shared/ui/control-panel';
import { useRequestWithInfinityScroll } from '@/shared/lib/hooks/use-request-with-infinity-scroll';
import { Sorter } from '@/shared/lib/helpers';
import { ApiRoutes } from '@/shared/config/api';
import { SortDirection } from '@/shared/const';
import styled from './heroes.module.css';

export const HeroesPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: heroes,
    isLoading,
    error,
    hasMore,
    lastNodeRef,
  } = useRequestWithInfinityScroll(ApiRoutes.HEROES);

  const currentSortParam =
    searchParams.get('sort') ?? (SortDirection.ASC as SortDirection);
  const sortedHeroes =
    heroes !== null
      ? Sorter.sortByCreated(
          heroes as HeroModel[],
          currentSortParam as SortDirection
        )
      : [];

  const handleSortChange = (newSortValue: SortDirection) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['heroes-page']}>
      <h1>Heroes</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SortDirection}
        handleSortChange={handleSortChange}
      />
      <HeroList
        heroes={sortedHeroes as HeroModel[]}
        isLoading={isLoading}
        error={error}
        hasMore={hasMore}
        lastNodeRef={lastNodeRef}
      />
    </div>
  );
};
