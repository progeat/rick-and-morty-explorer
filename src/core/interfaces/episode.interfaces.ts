interface EpisodeBase {
  id: number;
  name: string;
  episode: string;
  created: string;
}

export interface EpisodeDto extends EpisodeBase {
  air_date: string;
}

export interface EpisodeModel extends EpisodeBase {
  airDate: string;
}
