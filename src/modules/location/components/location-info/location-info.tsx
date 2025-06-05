import type { FC } from 'react';
import type { LocationModel } from '../../../../core/interfaces';

type LocationInfoProps = {
  location: LocationModel;
};

export const LocationInfo: FC<LocationInfoProps> = ({ location }) => {
  return (
    <ul>
      <li>name: {location.name}</li>
      <li>type: {location.type}</li>
      {location.dimension !== 'unknown' ? (
        <li>dimension: {location.dimension}</li>
      ) : null}
    </ul>
  );
};
