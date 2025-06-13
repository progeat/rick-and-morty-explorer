import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { EpisodeModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import { ROUTES } from '../../../../core/enums';
import styled from './episode-list.module.css';

type EpisodeListProps = {
  episodes: EpisodeModel[];
  isLoading: boolean;
  error: string | null;
};

export const EpisodeList: FC<EpisodeListProps> = ({
  episodes,
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
      {episodes.map(({ id, name }) => (
        <li className={styled.item} key={id}>
          <Link to={`${ROUTES.EPISODES}/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
