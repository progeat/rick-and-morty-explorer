import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EpisodeList } from '../../../modules/episode/components/episode-list';
import { ControlPanel } from '../../../ui/control-panel';
import type { EpisodeDto, EpisodeModel } from '../../../core/interfaces';
import { useRequestWithInfinityScroll } from '../../../core/hooks';
import { API_ROUTES, SORT_DIRECTION } from '../../../core/enums';
import { DtoToModelMapper } from '../../../core/mapers/dto-to-model.mappers';
import { Sorter } from '../../../core/helpers/sorter.helpers';
import styled from './episodes.module.css';

export const EpisodesPage: FC = () => {
  const {
    data: episodesData,
    isLoading,
    error,
    hasMore,
    lastNodeRef,
  } = useRequestWithInfinityScroll(API_ROUTES.EPISODES);

  const episodes =
    episodesData !== null
      ? DtoToModelMapper.normolizeEpisodes(episodesData as EpisodeDto[])
      : [];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam = searchParams.get('sort') ?? SORT_DIRECTION.ASC;
  const sortedEpisodes = Sorter.sortByCreated(
    episodes,
    currentSortParam as SORT_DIRECTION
  );

  const handleSortChange = (newSortValue: SORT_DIRECTION) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['episodes-page']}>
      <h1>Episodes</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SORT_DIRECTION}
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
