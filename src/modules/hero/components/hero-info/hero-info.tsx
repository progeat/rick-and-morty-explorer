import type { FC } from 'react';
import type { HeroModel } from '../../../../core/interfaces';
import styled from './hero-info.module.css';

type HeroInfoProps = {
  hero: HeroModel;
};

export const HeroInfo: FC<HeroInfoProps> = ({ hero }) => {
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
