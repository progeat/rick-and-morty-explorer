import type { EpisodeDto, EpisodeModel } from '@/shared/types';

export class DtoToModelMapper {
  static normolizeEpisodes = (episodesDto: EpisodeDto[]): EpisodeModel[] =>
    episodesDto.map((episode) => ({
      id: episode.id,
      name: episode.name,
      airDate: episode['air_date'],
      episode: episode.episode,
      created: episode.created,
    }));
}
