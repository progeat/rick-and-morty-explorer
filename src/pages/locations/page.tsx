import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LocationModel } from '@/shared/types';
import { LocationList } from '@/features/location/ui/location-list';
import { ControlPanel } from '@/shared/ui/control-panel';
import { useRequestWithInfinityScroll } from '@/shared/lib/hooks/use-request-with-infinity-scroll';
import { Sorter } from '@/shared/lib/helpers';
import { ApiRoutes } from '@/shared/config/api';
import { SortDirection } from '@/shared/const';
import styled from './locations.module.css';

export const LocationsPage: FC = () => {
  const {
    data: locations,
    isLoading,
    error,
    hasMore,
    lastNodeRef,
  } = useRequestWithInfinityScroll(ApiRoutes.LOCATIONS);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam =
    searchParams.get('sort') ?? (SortDirection.ASC as SortDirection);
  const sortedlocations =
    locations !== null
      ? Sorter.sortByCreated(
          locations as LocationModel[],
          currentSortParam as SortDirection
        )
      : [];

  const handleSortChange = (newSortValue: SortDirection) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['locations-page']}>
      <h1>Locations</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SortDirection}
        handleSortChange={handleSortChange}
      />
      <LocationList
        locations={sortedlocations as LocationModel[]}
        isLoading={isLoading}
        error={error}
        hasMore={hasMore}
        lastNodeRef={lastNodeRef}
      />
    </div>
  );
};
