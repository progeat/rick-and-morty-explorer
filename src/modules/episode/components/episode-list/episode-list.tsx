import type { FC, Ref } from 'react';
import { Link } from 'react-router-dom';
import type { EpisodeModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import { ROUTES } from '../../../../core/enums';
import styled from './episode-list.module.css';

type EpisodeListProps = {
  episodes: EpisodeModel[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastNodeRef: Ref<HTMLLIElement> | null;
};

export const EpisodeList: FC<EpisodeListProps> = (props) => {
  const { episodes, isLoading, error, hasMore, lastNodeRef } = props;

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <>
      <ul className={styled.list}>
        {episodes.map(({ id, name }, index) => (
          <li
            ref={episodes.length === index + 1 ? lastNodeRef : null}
            className={styled.item}
            key={id}
          >
            <Link to={`${ROUTES.EPISODES}/${id}`}>{name}</Link>
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
