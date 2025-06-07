import type { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EpisodeInfo } from '../../../modules/episode/components/episode-info';
import episodesData from '../../../core/data/episode.json';
import { DtoToModelMapper } from '../../../core/mapers/dto-to-model.mappers';
import { ROUTES } from '../../../core/enums';
import styled from './episode.module.css';

export const EpisodePage: FC = () => {
  const { id } = useParams();
  const episodes = DtoToModelMapper.normolizeEpisodes(episodesData);
  const episode = episodes.find((episode) => episode.id === Number(id));

  if (!id || !episode) {
    return <Navigate to={ROUTES.NOT_FOUND} />;
  }

  return (
    <div className={styled['episode-page']}>
      <h1>Episode</h1>
      <EpisodeInfo episode={episode} />
    </div>
  );
};
