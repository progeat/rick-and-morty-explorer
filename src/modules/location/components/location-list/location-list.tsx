import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { LocationModel } from '../../../../core/interfaces';
import { ROUTES } from '../../../../core/enums';
import styled from './location-list.module.css';
import { Loader } from '../../../../ui/loader';

type LocationListProps = {
  locations: LocationModel[];
  isLoading: boolean;
  error: string | null;
};

export const LocationList: FC<LocationListProps> = ({
  locations,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <ul className={styled.list}>
      {locations.map(({ id, name }) => (
        <li className={styled.item} key={id}>
          <Link to={`${ROUTES.LOCATIONS}/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
