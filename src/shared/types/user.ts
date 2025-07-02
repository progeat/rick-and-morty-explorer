type Sex = 'male' | 'female';

export interface User {
  name: string;
  login: string;
  email: string;
  sex: Sex;
  password: string;
}
