import { ApiRoutes, USERS_API } from '@/shared/config/api';

export const checkLoginAvailability = async (login: string): Promise<void> => {
  const response = await fetch(
    `${USERS_API}/${ApiRoutes.USERS}/?login=${login}`
  );
  const users = await response.json();

  if (users.length > 0) {
    throw new Error('Логин занят');
  }
};

export const checkEmailAvailability = async (email: string): Promise<void> => {
  const response = await fetch(
    `${USERS_API}/${ApiRoutes.USERS}/?email=${email}`
  );
  const users = await response.json();

  if (users.length > 0) {
    throw new Error('Почта уже зарегистрирована');
  }
};
