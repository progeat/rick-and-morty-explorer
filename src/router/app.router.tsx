import { lazy, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../core/enums';
import { Layout } from '../pages/layout';
import { PrivateRoute } from './private.router';

const Home = lazy(() =>
  import('../pages/home-page').then((module) => ({
    default: module.HomePage,
  }))
);
const Login = lazy(() =>
  import('../pages/auth/login').then((module) => ({
    default: module.LoginPage,
  }))
);
const Register = lazy(() =>
  import('../pages/auth/register').then((module) => ({
    default: module.RegisterPage,
  }))
);
const Heroes = lazy(() =>
  import('../pages/heroes/heroes').then((module) => ({
    default: module.HeroesPage,
  }))
);
const Hero = lazy(() =>
  import('../pages/heroes/hero').then((module) => ({
    default: module.HeroPage,
  }))
);
const Locations = lazy(() =>
  import('../pages/locations/locations').then((module) => ({
    default: module.LocationsPage,
  }))
);
const Location = lazy(() =>
  import('../pages/locations/location').then((module) => ({
    default: module.LocationPage,
  }))
);
const Episodes = lazy(() =>
  import('../pages/episodes/episodes').then((module) => ({
    default: module.EpisodesPage,
  }))
);
const Episode = lazy(() =>
  import('../pages/episodes/episode').then((module) => ({
    default: module.EpisodePage,
  }))
);
const NotFound = lazy(() =>
  import('../pages/not-found-page').then((module) => ({
    default: module.NotFoundPage,
  }))
);

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.HEROES}>
            <Route index element={<Heroes />} />
            <Route path={ROUTES.DYNAMIC_PATH} element={<Hero />} />
          </Route>
          <Route path={ROUTES.LOCATIONS}>
            <Route index element={<Locations />} />
            <Route path={ROUTES.DYNAMIC_PATH} element={<Location />} />
          </Route>
          <Route path={ROUTES.EPISODES}>
            <Route index element={<Episodes />} />
            <Route path={ROUTES.DYNAMIC_PATH} element={<Episode />} />
          </Route>
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.ALL_PATH} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
