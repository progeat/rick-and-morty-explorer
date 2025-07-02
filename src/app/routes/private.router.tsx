import { useContext, type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context';
import { AppRoutes } from '@/shared/config/routes';

export const PrivateRoute: FC = () => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return <Outlet />;
};
