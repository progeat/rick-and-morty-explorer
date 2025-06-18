import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EpisodeInfo } from '../../../modules/episode/components/episode-info';
import type { EpisodeDto } from '../../../core/interfaces';
import { useFetch } from '../../../core/hooks';
import { DtoToModelMapper } from '../../../core/mapers/dto-to-model.mappers';
import { API_ROUTES, ROUTES, TYPE_SOURCE } from '../../../core/enums';
import styled from './episode.module.css';

export const EpisodePage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: episodeData,
    isLoading,
    error,
    get,
  } = useFetch<EpisodeDto | null>(TYPE_SOURCE.DATA);

  const episode = episodeData
    ? DtoToModelMapper.normolizeEpisodes([episodeData])[0]
    : null;

  useEffect(() => {
    if (id) {
      get(`${API_ROUTES.EPISODES}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !episode)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['episode-page']}>
      <h1>Episode</h1>
      <EpisodeInfo episode={episode!} isLoading={isLoading} error={error} />
    </div>
  );
};
