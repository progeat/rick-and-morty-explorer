import type { FC } from 'react';
import { AuthProvider } from './context';
import { AppRouter } from './routes';
import { MantineProvider } from '@mantine/core';

export const App: FC = () => {
  return (
    <AuthProvider>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </AuthProvider>
  );
};
