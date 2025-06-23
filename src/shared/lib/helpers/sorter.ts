import type { EpisodeModel, HeroModel, LocationModel } from '@/shared/types';
import { SortDirection } from '@/shared/const';

type List = HeroModel[] | LocationModel[] | EpisodeModel[];

export class Sorter {
  static sortByCreated = (list: List, currentSortParam: SortDirection) => {
    return [...list].sort((a, b) =>
      currentSortParam === SortDirection.ASC
        ? new Date(a.created).getTime() - new Date(b.created).getTime()
        : new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  };
}
