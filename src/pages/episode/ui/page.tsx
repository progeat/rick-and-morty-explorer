import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { EpisodeDto } from '@/shared/types';
import { EpisodeInfo } from '@/features/episode/ui/episode-info';
import { useFetch } from '@/shared/lib/hooks/use-fetch';
import { DtoToModelMapper } from '@/shared/api/mappers';
import { ApiRoutes } from '@/shared/config/api';
import { AppRoutes } from '@/shared/config/routes';
import { TypeSource } from '@/shared/const';
import styled from './episode.module.css';

export const EpisodePage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: episodeData,
    isLoading,
    error,
    get,
  } = useFetch<EpisodeDto | null>(TypeSource.DATA);

  const episode = episodeData
    ? DtoToModelMapper.normolizeEpisodes([episodeData])[0]
    : null;

  useEffect(() => {
    if (id) {
      get(`${ApiRoutes.EPISODES}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !episode)) {
    return <Navigate to={AppRoutes.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['episode-page']}>
      <h1>Episode</h1>
      <EpisodeInfo episode={episode!} isLoading={isLoading} error={error} />
    </div>
  );
};
