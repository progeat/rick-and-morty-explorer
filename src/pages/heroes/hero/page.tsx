import type { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { HeroInfo } from '../../../modules/hero/hero-info';
import type { HeroModel } from '../../../core/interfaces';
import characters from '../../../core/data/characters.json';
import { ROUTES } from '../../../core/enums';
import styled from './hero-page.module.css';

export const HeroPage: FC = () => {
  const { id } = useParams();
  const hero = characters.find((hero) => hero.id === Number(id));

  if (!id || !hero) {
    return <Navigate to={ROUTES.NOT_FOUND} />;
  }

  return (
    <div className={styled['hero-page']}>
      <h1>{hero?.name}</h1>
      <HeroInfo hero={hero as HeroModel} />
    </div>
  );
};
