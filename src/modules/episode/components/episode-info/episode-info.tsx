import type { FC } from 'react';
import type { EpisodeModel } from '../../../../core/interfaces';

type EpisodeInfoProps = {
  episode: EpisodeModel;
};

export const EpisodeInfo: FC<EpisodeInfoProps> = ({ episode }) => {
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
