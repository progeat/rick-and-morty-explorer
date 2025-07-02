import { useEffect, useRef, type FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import type { HeroModel } from '@/shared/types';
import { HeroInfo } from '@/features/hero/ui/hero-info';
import { useFetch } from '@/shared/lib/hooks/use-fetch';
import { ApiRoutes } from '@/shared/config/api';
import { AppRoutes } from '@/shared/config/routes';
import { TypeSource } from '@/shared/const';
import styled from './hero.module.css';

export const HeroPage: FC = () => {
  const hasRequested = useRef(false);

  const { id } = useParams();

  const {
    data: hero,
    isLoading,
    error,
    get,
  } = useFetch<HeroModel | null>(TypeSource.DATA);

  useEffect(() => {
    if (id) {
      get(`${ApiRoutes.HEROES}/${id}`);
      hasRequested.current = true;
    }
  }, [get, id]);

  if (!id || (hasRequested.current && !isLoading && !hero)) {
    return <Navigate to={AppRoutes.NOT_FOUND} replace />;
  }

  return (
    <div className={styled['hero-page']}>
      <h1>{hero?.name}</h1>
      <HeroInfo hero={hero!} isLoading={isLoading} error={error} />
    </div>
  );
};
