import { useContext, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { ROUTES } from '../../core/enums';
import styled from './header.module.css';

export const Header: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const onLogout = () => {
    setUser(null);
  };

  return (
    <header className={styled.header}>
      <nav className={styled.nav}>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        {user !== null && (
          <>
            <NavLink to={ROUTES.HEROES}>Heroes</NavLink>
            <NavLink to={ROUTES.LOCATIONS}>Locations</NavLink>
            <NavLink to={ROUTES.EPISODES}>Episodes</NavLink>
          </>
        )}
      </nav>
      <div>
        {user !== null ? (
          <button className={styled.logout} onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to={ROUTES.LOGIN}>Login</Link>
        )}
      </div>
    </header>
  );
};
