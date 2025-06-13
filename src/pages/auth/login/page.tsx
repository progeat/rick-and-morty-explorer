import { useContext, useState, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts';
import { AuthLayout } from '../layout';
import { Signin } from '../../../modules/auth/components/sign-in';
import { ROUTES } from '../../../core/enums';
import { Auth } from '../../../core/helpers/auth.helpers';

type AuthFormValues = {
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (authValues: AuthFormValues): Promise<void> => {
    try {
      const user = await Auth.login(authValues);
      setUser(user);
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
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <AuthLayout>
      <Signin error={error} resetErrorSubmit={resetError} onSubmit={onSubmit} />
    </AuthLayout>
  );
};
