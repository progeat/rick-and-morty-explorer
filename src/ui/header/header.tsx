import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../core/enums';
import styled from './header.module.css';

export const Header: FC = () => {
  return (
    <header className={styled.header}>
      <nav className={styled.nav}>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.HEROES}>Heroes</NavLink>
        <NavLink to={ROUTES.LOCATIONS}>Locations</NavLink>
        <NavLink to={ROUTES.EPISODES}>Episodes</NavLink>
      </nav>
    </header>
  );
};
