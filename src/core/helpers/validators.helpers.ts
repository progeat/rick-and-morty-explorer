type ValidateType = string | null;

export class Validators {
  static validateEmail = (email: string): ValidateType => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return 'Email обязателен';
    if (!emailRegex.test(email)) return 'Некорректный формат email';

    return null;
  };

  static validatePassword = (password: string): ValidateType => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 6)
      return 'Пароль должен содержать не менее 6 символов';

    return null;
  };

  static validatePasswordRepeat = (
    passwordRepeat: string,
    password: string
  ): ValidateType => {
    if (!passwordRepeat) return 'Повтор пароля обязателен';
    if (passwordRepeat !== password) return 'Повтор пароля несовпадает';

    return null;
  };

  static validateName = (name: string): ValidateType => {
    const nameRegex = /^[A-ZА-ЯЁ]+$/i;

    if (!name) return 'Имя обязательно';
    if (!nameRegex.test(name)) return 'Имя должно содержать только буквы';
    if (name.length < 2) return 'Имя должно содержать не менее 2 символов';

    return null;
  };

  static validateLogin = (login: string): ValidateType => {
    if (!login) return 'Логин обязателен';
    if (login.length < 2 || login.length > 20)
      return 'Логин должен содержать не менее 2-ух и не более 20 символов';

    return null;
  };
}
