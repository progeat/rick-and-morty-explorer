import type { FC } from 'react';
import { AuthProvider } from './context';
import { AppRouter } from './routes';

export const App: FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
