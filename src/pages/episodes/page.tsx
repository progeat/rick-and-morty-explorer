import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { EpisodeDto, EpisodeModel } from '@/shared/types';
import { EpisodeList } from '@/features/episode/ui/episode-list';
import { ControlPanel } from '@/shared/ui/control-panel';
import { useRequestWithInfinityScroll } from '@/shared/lib/hooks/use-request-with-infinity-scroll';
import { DtoToModelMapper } from '@/shared/api/mappers';
import { Sorter } from '@/shared/lib/helpers';
import { ApiRoutes } from '@/shared/config/api';
import { SortDirection } from '@/shared/const';
import styled from './episodes.module.css';

export const EpisodesPage: FC = () => {
  const {
    data: episodesData,
    isLoading,
    error,
    hasMore,
    lastNodeRef,
  } = useRequestWithInfinityScroll(ApiRoutes.EPISODES);

  const episodes =
    episodesData !== null
      ? DtoToModelMapper.normolizeEpisodes(episodesData as EpisodeDto[])
      : [];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam = searchParams.get('sort') ?? SortDirection.ASC;
  const sortedEpisodes = Sorter.sortByCreated(
    episodes,
    currentSortParam as SortDirection
  );

  const handleSortChange = (newSortValue: SortDirection) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['episodes-page']}>
      <h1>Episodes</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SortDirection}
        handleSortChange={handleSortChange}
      />
      <EpisodeList
        episodes={sortedEpisodes as EpisodeModel[]}
        isLoading={isLoading}
        error={error}
        hasMore={hasMore}
        lastNodeRef={lastNodeRef}
      />
    </div>
  );
};
