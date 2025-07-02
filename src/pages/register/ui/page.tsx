import { useContext, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '@/shared/types';
import { Signup } from '@/features/auth/ui/sign-up';
import { AuthLayout } from '@/widgets/layouts';
import { AuthContext } from '@/app/context';
import { useFetch } from '@/shared/lib/hooks/use-fetch';
import { ApiRoutes } from '@/shared/config/api';
import { AppRoutes } from '@/shared/config/routes';
import { TypeSource } from '@/shared/const';

export const RegisterPage: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const { post } = useFetch(TypeSource.USERS);

  const onSubmit = (user: User) => {
    post(ApiRoutes.USERS, user);

    setUser(user);
  };

  if (user !== null) {
    return <Navigate to={AppRoutes.HOME} />;
  }

  return (
    <AuthLayout>
      <Signup onSubmit={onSubmit} />
    </AuthLayout>
  );
};
