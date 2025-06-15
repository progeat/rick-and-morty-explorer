import { REGEX } from '../variables/regex.variables';
import { VALIDATION_CONSTANTS } from '../variables/validation.variables';

type ValidateType = string | null;

export class Validators {
  static validateEmail = (email: string): ValidateType => {
    if (!email) return 'Email обязателен';
    if (!REGEX.EMAIL.test(email)) return 'Некорректный формат email';

    return null;
  };

  static validatePassword = (password: string): ValidateType => {
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_CONSTANTS.PASSWORD;

    if (!password) return 'Пароль обязателен';
    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH!)
      return `Пароль должен содержать не менее ${MIN_LENGTH} и не более ${MAX_LENGTH} символов`;

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
    const { MIN_LENGTH } = VALIDATION_CONSTANTS.NAME;

    if (!name) return 'Имя обязательно';
    if (!REGEX.NAME.test(name)) return 'Имя должно содержать только буквы';
    if (name.length < MIN_LENGTH)
      return `Имя должно содержать не менее ${MIN_LENGTH} символов`;

    return null;
  };

  static validateLogin = (login: string): ValidateType => {
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_CONSTANTS.LOGIN;

    if (!login) return 'Логин обязателен';
    if (login.length < MIN_LENGTH || login.length > MAX_LENGTH!)
      return `Логин должен содержать не менее ${MIN_LENGTH}(-ух) и не более ${MAX_LENGTH} символов`;

    return null;
  };
}
