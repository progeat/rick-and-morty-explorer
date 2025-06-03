import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../ui/header';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
