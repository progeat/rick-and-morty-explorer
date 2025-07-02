export const RICK_AND_MORTY_API = import.meta.env.VITE_API_URL;

export const USERS_API = import.meta.env.VITE_API_USERS_URL;

export enum ApiRoutes {
  HEROES = 'character',
  EPISODES = 'episode',
  LOCATIONS = 'location',
  USERS = 'users',
}
