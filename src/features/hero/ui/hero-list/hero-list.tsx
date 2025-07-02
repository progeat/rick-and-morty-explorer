import type { FC, Ref } from 'react';
import { Link } from 'react-router-dom';
import type { HeroModel } from '@/shared/types';
import { AppRoutes } from '@/shared/config/routes';
import { Box, List, Loader } from '@mantine/core';
import styled from './hero-list.module.css';

type HeroListProps = {
  heroes: HeroModel[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastNodeRef: Ref<HTMLLIElement> | null;
};

export const HeroList: FC<HeroListProps> = (props) => {
  const { heroes, isLoading, error, hasMore, lastNodeRef } = props;

  if (error) {
    return <p className={styled.error}>{error}</p>;
  }

  return (
    <>
      <List
        styles={{
          root: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
          item: { width: '30%' },
        }}
      >
        {heroes.map((hero, index) => (
          <List.Item
            ref={heroes.length === index + 1 ? lastNodeRef : null}
            key={hero.id}
          >
            <Link className={styled.link} to={`${AppRoutes.HEROES}/${hero.id}`}>
              <img className={styled.img} src={hero.image} />
              {hero.name}
            </Link>
          </List.Item>
        ))}
      </List>
      {isLoading && hasMore && (
        <Box h={100} p={20}>
          <Loader
            styles={{ root: { margin: '0 auto' } }}
            color="teal"
            type="dots"
          />
        </Box>
      )}
    </>
  );
};
