import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../providers';
import { Header } from '@/widgets/header';
import { Loader } from '@/shared/ui/loader';

export const MainLayout: FC = () => {
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
