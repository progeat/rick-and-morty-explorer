import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { HeroModel } from '../../../../core/interfaces';
import { Loader } from '../../../../ui/loader';
import { ROUTES } from '../../../../core/enums';
import styled from './hero-list.module.css';

type HeroListProps = {
  heroes: HeroModel[];
  isLoading: boolean;
  error: string | null;
};

export const HeroList: FC<HeroListProps> = ({ heroes, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <ul className={styled.list}>
      {heroes.map((hero) => (
        <li className={styled.item} key={hero.id}>
          <Link className={styled.link} to={`${ROUTES.HEROES}/${hero.id}`}>
            <img className={styled.img} src={hero.image} />
            {hero.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
