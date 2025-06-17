import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { HeroInfo } from '../../../modules/hero/components/hero-info';
import type { HeroModel } from '../../../core/interfaces';
import { useFetch } from '../../../core/hooks';
import { API_ROUTES, ROUTES, TYPE_SOURCE } from '../../../core/enums';
import styled from './hero.module.css';

export const HeroPage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: hero,
    isLoading,
    error,
    get,
  } = useFetch<HeroModel | null>(TYPE_SOURCE.DATA);

  useEffect(() => {
    if (id) {
      get(`${API_ROUTES.HEROES}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !hero)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['hero-page']}>
      <h1>{hero?.name}</h1>
      <HeroInfo hero={hero!} isLoading={isLoading} error={error} />
    </div>
  );
};
