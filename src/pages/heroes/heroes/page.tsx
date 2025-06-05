import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeroList } from '../../../modules/hero/components/hero-list';
import { ControlPanel } from '../../../ui/control-panel';
import type { HeroModel } from '../../../core/interfaces';
import { SORT_DIRECTION } from '../../../core/enums';
import { Sorter } from '../../../core/helpers/sorter.helpers';
import heroes from '../../../core/data/characters.json';
import styled from './heroes.module.css';

export const HeroesPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortParam =
    searchParams.get('sort') ?? (SORT_DIRECTION.ASC as SORT_DIRECTION);
  const sortedHeroes = Sorter.sortByCreated(
    heroes as HeroModel[],
    currentSortParam as SORT_DIRECTION
  );

  const handleSortChange = (newSortValue: SORT_DIRECTION) => {
    setSearchParams({ sort: newSortValue });
  };

  return (
    <div className={styled['heroes-page']}>
      <h1>Heroes</h1>
      <ControlPanel
        currentSortParam={currentSortParam as SORT_DIRECTION}
        handleSortChange={handleSortChange}
      />
      <HeroList heroes={sortedHeroes as HeroModel[]} />
    </div>
  );
};
