import type { FC } from 'react';
import type { EpisodeModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import styled from './episode-info.module.css';

type EpisodeInfoProps = {
  episode: EpisodeModel;
  isLoading: boolean;
  error: string | null;
};

export const EpisodeInfo: FC<EpisodeInfoProps> = ({
  episode,
  isLoading,
  error,
}) => {
  if (isLoading || !episode) {
    return <Loader />;
  }

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <div>
      <h3>{episode.name}</h3>
      <ul>
        <li>air date: {episode.airDate}</li>
        <li>episode: {episode.episode}</li>
      </ul>
    </div>
  );
};
