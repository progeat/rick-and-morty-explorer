import type { FC } from 'react';
import { AuthProvider } from './contexts';
import { AppRouter } from './router';

export const App: FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
