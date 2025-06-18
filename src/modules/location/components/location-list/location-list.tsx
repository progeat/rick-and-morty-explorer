import type { FC, Ref } from 'react';
import { Link } from 'react-router-dom';
import type { LocationModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import { ROUTES } from '../../../../core/enums';
import styled from './location-list.module.css';

type LocationListProps = {
  locations: LocationModel[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastNodeRef: Ref<HTMLLIElement> | null;
};

export const LocationList: FC<LocationListProps> = (props) => {
  const { locations, isLoading, error, hasMore, lastNodeRef } = props;

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <>
      <ul className={styled.list}>
        {locations.map(({ id, name }, index) => (
          <li
            ref={locations.length === index + 1 ? lastNodeRef : null}
            className={styled.item}
            key={id}
          >
            <Link to={`${ROUTES.LOCATIONS}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      {isLoading && hasMore && (
        <div className={styled['loader-wrapper']}>
          <Loader />
        </div>
      )}
    </>
  );
};
