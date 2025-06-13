import { useContext, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../../../core/interfaces';
import { AuthContext } from '../../../contexts';
import { AuthLayout } from '../layout';
import { Signup } from '../../../modules/auth/components/sign-up';
import { useFetch } from '../../../core/hooks';
import { API_ROUTES, ROUTES } from '../../../core/enums';

export const RegisterPage: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const { post } = useFetch();

  const onSubmit = (user: User) => {
    post(API_ROUTES.USERS, user);

    setUser(user);
  };

  if (user !== null) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <AuthLayout>
      <Signup onSubmit={onSubmit} />
    </AuthLayout>
  );
};
