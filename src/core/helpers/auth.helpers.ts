import { API_ROUTES } from '../enums';
import type { User } from '../interfaces';

const baseUrl = import.meta.env.VITE_API_URL;

interface Login {
  email: string;
  password: string;
}

export class Auth {
  static login = async ({ email, password }: Login) => {
    const response = await fetch(
      `${baseUrl}/${API_ROUTES.USERS}/?email=${email}`
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
