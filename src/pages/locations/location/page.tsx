import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LocationInfo } from '../../../modules/location/components/location-info';
import type { LocationModel } from '../../../core/interfaces';
import { useFetch } from '../../../core/hooks';
import { API_ROUTES, ROUTES } from '../../../core/enums';
import styled from './location.module.css';

export const LocationPage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: location,
    isLoading,
    error,
    get,
  } = useFetch<LocationModel | null>();

  useEffect(() => {
    if (id) {
      get(`${API_ROUTES.LOCATIONS}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !location)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['location-page']}>
      <h1>Location</h1>
      <LocationInfo location={location!} isLoading={isLoading} error={error} />
    </div>
  );
};
