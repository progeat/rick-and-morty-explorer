import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocationList } from '../../../modules/location/components/location-list';
import { ControlPanel } from '../../../ui/control-panel';
import type { LocationModel } from '../../../core/interfaces';
import { useRequestWithInfinityScroll } from '../../../core/hooks';
import { API_ROUTES, SORT_DIRECTION } from '../../../core/enums';
import { Sorter } from '../../../core/helpers/sorter.helpers';
import styled from './locations.module.css';

export const LocationsPage: FC = () => {
  const {
    data: locations,
    isLoading,
    error,
    hasMore,
    lastNodeRef,
  } = useRequestWithInfinityScroll(API_ROUTES.LOCATIONS);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam =
    searchParams.get('sort') ?? (SORT_DIRECTION.ASC as SORT_DIRECTION);
  const sortedlocations =
    locations !== null
      ? Sorter.sortByCreated(
          locations as LocationModel[],
          currentSortParam as SORT_DIRECTION
        )
      : [];

  const handleSortChange = (newSortValue: SORT_DIRECTION) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['locations-page']}>
      <h1>Locations</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SORT_DIRECTION}
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
