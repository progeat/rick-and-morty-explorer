import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../ui/header';
import { Loader } from '../ui/loader';
import { ErrorBoundary } from '../ui/error-boundary/error-boundary';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
    </>
  );
};
