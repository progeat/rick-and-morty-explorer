import { lazy, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private.router';
import { MainLayout } from '../layouts';
import { AppRoutes } from '@/shared/config/routes';

const Home = lazy(() =>
  import('@/pages/home-page').then((module) => ({
    default: module.HomePage,
  }))
);
const Login = lazy(() =>
  import('@/pages/login').then((module) => ({
    default: module.LoginPage,
  }))
);
const Register = lazy(() =>
  import('@/pages/register').then((module) => ({
    default: module.RegisterPage,
  }))
);
const Heroes = lazy(() =>
  import('@/pages/heroes').then((module) => ({
    default: module.HeroesPage,
  }))
);
const Hero = lazy(() =>
  import('@/pages/hero').then((module) => ({
    default: module.HeroPage,
  }))
);
const Locations = lazy(() =>
  import('@/pages/locations').then((module) => ({
    default: module.LocationsPage,
  }))
);
const Location = lazy(() =>
  import('@/pages/location').then((module) => ({
    default: module.LocationPage,
  }))
);
const Episodes = lazy(() =>
  import('@/pages/episodes').then((module) => ({
    default: module.EpisodesPage,
  }))
);
const Episode = lazy(() =>
  import('@/pages/episode').then((module) => ({
    default: module.EpisodePage,
  }))
);
const NotFound = lazy(() =>
  import('@/pages/not-found-page').then((module) => ({
    default: module.NotFoundPage,
  }))
);

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={AppRoutes.HEROES}>
            <Route index element={<Heroes />} />
            <Route path={AppRoutes.DYNAMIC_PATH} element={<Hero />} />
          </Route>
          <Route path={AppRoutes.LOCATIONS}>
            <Route index element={<Locations />} />
            <Route path={AppRoutes.DYNAMIC_PATH} element={<Location />} />
          </Route>
          <Route path={AppRoutes.EPISODES}>
            <Route index element={<Episodes />} />
            <Route path={AppRoutes.DYNAMIC_PATH} element={<Episode />} />
          </Route>
        </Route>
        <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
        <Route path={AppRoutes.ALL_PATH} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
