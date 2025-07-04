import type { FC } from 'react';
import { AuthProvider } from './context';
import { AppRouter } from './routes';
import { MantineProvider } from '@mantine/core';

export const App: FC = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Service worker registered', reg);
        })
        .catch((error) => {
          console.error('Service worker not registered', error);
        });
    });
  }

  return (
    <AuthProvider>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </AuthProvider>
  );
};
