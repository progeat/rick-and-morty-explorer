import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../core/enums';
import { Layout } from '../pages/layout';
import { HomePage } from '../pages/home-page';
import { HeroesPage } from '../pages/heroes/heroes';
import { HeroPage } from '../pages/heroes/hero';
import { LocationsPage } from '../pages/locations/locations';
import { LocationPage } from '../pages/locations/location';
import { EpisodesPage } from '../pages/episodes/episodes';
import { EpisodePage } from '../pages/episodes/episode';
import { NotFoundPage } from '../pages/not-found-page';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.HEROES}>
          <Route index element={<HeroesPage />} />
          <Route path={ROUTES.DYNAMIC_PATH} element={<HeroPage />} />
        </Route>
        <Route path={ROUTES.LOCATIONS}>
          <Route index element={<LocationsPage />} />
          <Route path={ROUTES.DYNAMIC_PATH} element={<LocationPage />} />
        </Route>
        <Route path={ROUTES.EPISODES}>
          <Route index element={<EpisodesPage />} />
          <Route path={ROUTES.DYNAMIC_PATH} element={<EpisodePage />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={ROUTES.ALL_PATH} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
