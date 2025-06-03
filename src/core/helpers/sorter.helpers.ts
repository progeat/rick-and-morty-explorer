import type { EpisodeModel, HeroModel, LocationModel } from '../interfaces';
import { SORT_DIRECTION } from '../enums';

type List = HeroModel[] | LocationModel[] | EpisodeModel[];

export class Sorter {
  static sortByCreated = (list: List, currentSortParam: SORT_DIRECTION) => {
    return [...list].sort((a, b) =>
      currentSortParam === SORT_DIRECTION.ASC
        ? new Date(a.created).getTime() - new Date(b.created).getTime()
        : new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  };
}
