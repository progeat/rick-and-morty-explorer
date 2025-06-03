import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocationList } from '../../../modules/location/location-list';
import { ControlPanel } from '../../../ui/control-panel';
import type { LocationModel } from '../../../core/interfaces';
import { SORT_DIRECTION } from '../../../core/enums';
import { Sorter } from '../../../core/helpers/sorter.helpers';
import locations from '../../../core/data/location.json';
import styled from './locations-page.module.css';

export const LocationsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam =
    searchParams.get('sort') ?? (SORT_DIRECTION.ASC as SORT_DIRECTION);
  const sortedlocations = Sorter.sortByCreated(
    locations as LocationModel[],
    currentSortParam as SORT_DIRECTION
  );

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
      <LocationList locations={sortedlocations as LocationModel[]} />
    </div>
  );
};
