import type { FC } from 'react';
import type { LocationModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import styled from './location-info.module.css';

type LocationInfoProps = {
  location: LocationModel;
  isLoading: boolean;
  error: string | null;
};

export const LocationInfo: FC<LocationInfoProps> = ({
  location,
  isLoading,
  error,
}) => {
  if (isLoading && !location) {
    return <Loader />;
  }

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <ul>
      <li>name: {location?.name}</li>
      <li>type: {location?.type}</li>
      {location?.dimension !== 'unknown' ? (
        <li>dimension: {location?.dimension}</li>
      ) : null}
    </ul>
  );
};
