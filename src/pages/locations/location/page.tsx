import type { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LocationInfo } from '../../../modules/location/location-info';
import type { LocationModel } from '../../../core/interfaces';
import { ROUTES } from '../../../core/enums';
import locations from '../../../core/data/location.json';
import styled from './location-page.module.css';

export const LocationPage: FC = () => {
  const { id } = useParams();
  const location = locations.find((location) => location.id === Number(id));

  if (!id || !location) {
    return <Navigate to={ROUTES.NOT_FOUND} />;
  }

  return (
    <div className={styled['location-page']}>
      <h1>Location</h1>
      <LocationInfo location={location as LocationModel} />
    </div>
  );
};
