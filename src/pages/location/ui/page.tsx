import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { LocationModel } from '@/shared/types';
import { LocationInfo } from '@/features/location/ui/location-info';
import { useFetch } from '@/shared/lib/hooks/use-fetch';
import { TypeSource } from '@/shared/const';
import { ApiRoutes } from '@/shared/config/api';
import { AppRoutes } from '@/shared/config/routes';
import styled from './location.module.css';

export const LocationPage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: location,
    isLoading,
    error,
    get,
  } = useFetch<LocationModel | null>(TypeSource.DATA);

  useEffect(() => {
    if (id) {
      get(`${ApiRoutes.LOCATIONS}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !location)) {
    return <Navigate to={AppRoutes.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['location-page']}>
      <h1>Location</h1>
      <LocationInfo location={location!} isLoading={isLoading} error={error} />
    </div>
  );
};
