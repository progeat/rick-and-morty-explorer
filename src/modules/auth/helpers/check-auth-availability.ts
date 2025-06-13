import { API_ROUTES } from '../../../core/enums';

const baseUrl = import.meta.env.VITE_API_URL;

export const checkLoginAvailability = async (login: string): Promise<void> => {
  const response = await fetch(
    `${baseUrl}/${API_ROUTES.USERS}/?login=${login}`
  );
  const users = await response.json();

  if (users.length > 0) {
    throw new Error('Логин занят');
  }
};

export const checkEmailAvailability = async (email: string): Promise<void> => {
  const response = await fetch(
    `${baseUrl}/${API_ROUTES.USERS}/?email=${email}`
  );
  const users = await response.json();

  if (users.length > 0) {
    throw new Error('Почта уже зарегистрирована');
  }
};
