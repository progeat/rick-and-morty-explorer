import type { User } from '@/shared/types';
import { ApiRoutes, USERS_API } from '@/shared/config/api';

interface Login {
  email: string;
  password: string;
}

export class Auth {
  static login = async ({ email, password }: Login) => {
    const response = await fetch(
      `${USERS_API}/${ApiRoutes.USERS}/?email=${email}`
    );
    const users: User[] = await response.json();

    const user = users.find((user) => user.email === email);

    const passwordPass = user?.password === password;

    if (!user || !passwordPass) {
      throw new Error('Не верно введена почта или пароль');
    }

    return user;
  };
}
