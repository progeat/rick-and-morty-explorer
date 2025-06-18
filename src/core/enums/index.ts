export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  HEROES = '/heroes',
  LOCATIONS = '/locations',
  EPISODES = '/episodes',
  DYNAMIC_PATH = ':id',
  NOT_FOUND = '/404',
  ALL_PATH = '*',
}

export enum SORT_DIRECTION {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TYPE_SOURCE {
  DATA = 'data',
  USERS = 'users',
}

export enum API_ROUTES {
  HEROES = 'character',
  EPISODES = 'episode',
  LOCATIONS = 'location',
  USERS = 'users',
}
