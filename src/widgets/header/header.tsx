import { useContext, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '@/app/context';
import { AppRoutes } from '@/shared/config/routes';
import styled from './header.module.css';

export const Header: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const onLogout = () => {
    setUser(null);
  };

  return (
    <header className={styled.header}>
      <nav className={styled.nav}>
        <NavLink to={AppRoutes.HOME}>Home</NavLink>
        {user !== null && (
          <>
            <NavLink to={AppRoutes.HEROES}>Heroes</NavLink>
            <NavLink to={AppRoutes.LOCATIONS}>Locations</NavLink>
            <NavLink to={AppRoutes.EPISODES}>Episodes</NavLink>
          </>
        )}
      </nav>
      <div>
        {user !== null ? (
          <button className={styled.logout} onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to={AppRoutes.LOGIN}>Login</Link>
        )}
      </div>
    </header>
  );
};
