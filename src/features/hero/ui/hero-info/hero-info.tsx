import type { FC } from 'react';
import type { HeroModel } from '@/shared/types';
import { Loader } from '@/shared/ui/loader';
import styled from './hero-info.module.css';

type HeroInfoProps = {
  hero: HeroModel;
  isLoading: boolean;
  error: string | null;
};

export const HeroInfo: FC<HeroInfoProps> = ({ hero, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <div className={styled['hero-info']}>
      <img
        className={styled.img}
        src={hero?.image}
        alt={`Image ${hero?.name}`}
      ></img>
      <div>
        <p>
          {hero?.status} - {hero?.species}
        </p>
        <p>sex: {hero?.gender}</p>
        {hero?.type && <p>type: {hero?.type}</p>}
      </div>
    </div>
  );
};
