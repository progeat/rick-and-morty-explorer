import type { FC, Ref } from 'react';
import { Link } from 'react-router-dom';
import type { HeroModel } from '@/shared/types';
import { Loader } from '@/shared/ui/loader';
import { AppRoutes } from '@/shared/config/routes';
import styled from './hero-list.module.css';

type HeroListProps = {
  heroes: HeroModel[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastNodeRef: Ref<HTMLLIElement> | null;
};

export const HeroList: FC<HeroListProps> = (props) => {
  const { heroes, isLoading, error, hasMore, lastNodeRef } = props;

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <>
      <ul className={styled.list}>
        {heroes.map((hero, index) => (
          <li
            ref={heroes.length === index + 1 ? lastNodeRef : null}
            className={styled.item}
            key={hero.id}
          >
            <Link className={styled.link} to={`${AppRoutes.HEROES}/${hero.id}`}>
              <img className={styled.img} src={hero.image} />
              {hero.name}
            </Link>
          </li>
        ))}
      </ul>
      {isLoading && hasMore && (
        <div className={styled['loader-wrapper']}>
          <Loader />
        </div>
      )}
    </>
  );
};
