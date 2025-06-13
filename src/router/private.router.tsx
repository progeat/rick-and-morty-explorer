import { useContext, type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../core/enums';
import { AuthContext } from '../contexts';

export const PrivateRoute: FC = () => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
