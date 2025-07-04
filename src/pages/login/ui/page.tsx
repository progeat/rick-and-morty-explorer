import { useContext, useState, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/app/context';
import { Signin } from '@/features/auth/ui/sign-in';
import { AuthLayout } from '@/widgets/layouts';
// import { Auth } from '@/features/auth/lib';
import { AppRoutes } from '@/shared/config/routes';
import type { User } from '@/shared/types';

type AuthFormValues = {
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (authValues: AuthFormValues): Promise<void> => {
    try {
      const user = authValues && {
        name: 'administrator',
        login: 'admin',
        email: 'admin@rick.com',
        sex: 'male',
      }; // await Auth.login(authValues); // json-server
      setUser(user as User);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const resetError = () => {
    setError(null);
  };

  if (user !== null) {
    return <Navigate to={AppRoutes.HOME} />;
  }

  return (
    <AuthLayout>
      <Signin error={error} resetErrorSubmit={resetError} onSubmit={onSubmit} />
    </AuthLayout>
  );
};
