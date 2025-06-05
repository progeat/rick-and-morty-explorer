import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { EpisodeModel } from '../../../../core/interfaces';
import { ROUTES } from '../../../../core/enums';
import styled from './episode-list.module.css';

type EpisodeListProps = {
  episodes: EpisodeModel[];
};

export const EpisodeList: FC<EpisodeListProps> = ({ episodes }) => {
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
