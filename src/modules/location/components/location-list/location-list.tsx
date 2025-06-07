import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { LocationModel } from '../../../../core/interfaces';
import { ROUTES } from '../../../../core/enums';
import styled from './location-list.module.css';

type LocationListProps = {
  locations: LocationModel[];
};

export const LocationList: FC<LocationListProps> = ({ locations }) => {
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
