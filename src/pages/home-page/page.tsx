import type { FC } from 'react';
import styled from './page.module.css';

export const HomePage: FC = () => {
  return (
    <div className={styled['home-page']}>
      <h1>The Rick and Morty</h1>
    </div>
  );
};
