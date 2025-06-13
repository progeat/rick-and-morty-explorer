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

export enum API_ROUTES {
  HEROES = 'characters',
  EPISODES = 'episode',
  LOCATIONS = 'location',
  USERS = 'users',
}
