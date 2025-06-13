import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FocusEvent,
} from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../../../core/interfaces';
import { TextInput } from '../../../../ui/text-input';
import { Validators } from '../../../../core/helpers/validators.helpers';
import { checkEmailAvailability, checkLoginAvailability } from '../../helpers';
import Logo from '../../../../static/assets/react.svg?react';
import { ROUTES } from '../../../../core/enums';
import styled from './signup.module.css';

type Sex = 'male' | 'female';

interface FormValues {
  name: string;
  login: string;
  email: string;
  sex: Sex;
  password: string;
  passwordRepeat: string;
}

interface FormErrors {
  name: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  passwordRepeat: string | null;
}

interface SignupProps {
  onSubmit: (values: User) => void;
}

export const Signup = ({ onSubmit }: SignupProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputsRef = useRef<FormValues>({
    name: '',
    login: '',
    email: '',
    sex: 'male',
    password: '',
    passwordRepeat: '',
  });

  const [inputsError, setInputsError] = useState<FormErrors>({
    name: null,
    login: null,
    email: null,
    password: null,
    passwordRepeat: null,
  });

  const [sex, setSex] = useState<Sex>('male');

  const error = inputsError.email || inputsError.password;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputsValue = inputsRef.current;
    const nameError = Validators.validateName(inputsValue.name);
    const loginError = Validators.validateLogin(inputsValue.login);
    const emailError = Validators.validateEmail(inputsValue.email);
    const passwordError = Validators.validatePassword(inputsValue.password);
    const passwordRepeatError = Validators.validatePasswordRepeat(
      inputsValue.passwordRepeat,
      inputsValue.password
    );

    if (
      nameError ||
      loginError ||
      emailError ||
      passwordError ||
      passwordRepeatError
    ) {
      setInputsError({
        name: nameError,
        login: loginError,
        email: emailError,
        password: passwordError,
        passwordRepeat: passwordRepeatError,
      });

      return;
    }

    onSubmit({
      name: inputsValue.name,
      login: inputsValue.login,
      email: inputsValue.email,
      sex: inputsValue.sex,
      password: inputsValue.password,
    });

    formRef.current?.reset();
  };

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    inputsRef.current = {
      ...inputsRef.current,
      [event.target.name]: event.target.value,
    };

    setInputsError((prev) => ({ ...prev, [event.target.name]: null }));
  };

  const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let error: string | null = null;

    switch (name) {
      case 'name':
        error = Validators.validateName(value);
        break;
      case 'login':
        error = Validators.validateLogin(value);
        if (!error) {
          try {
            await checkLoginAvailability(value);
          } catch (err: unknown) {
            if (err instanceof Error) {
              error = err.message || 'Логин занят';
            }
          }
        }
        break;
      case 'email':
        error = Validators.validateEmail(value);
        if (!error) {
          try {
            await checkEmailAvailability(value);
          } catch (err: unknown) {
            if (err instanceof Error) {
              error = err.message || 'Почта уже зарегистрирована';
            }
          }
        }
        break;
      case 'password':
        error = Validators.validatePassword(value);
        break;
      case 'passwordRepeat':
        error = Validators.validatePasswordRepeat(
          value,
          inputsRef.current.password
        );
        break;
    }

    if (error) {
      setInputsError((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSex = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSex(value as Sex);
    inputsRef.current.sex = value as Sex;
  };

  const handleReset = () => {
    inputsRef.current = {
      name: '',
      login: '',
      email: '',
      sex: 'male',
      password: '',
      passwordRepeat: '',
    };
  };

  return (
    <form
      ref={formRef}
      className={styled.form}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onReset={handleReset}
      noValidate
    >
      <h2>Регистрация</h2>
      <TextInput
        name="name"
        type="text"
        label="Имя"
        description="Введите имя"
        placeholder="Введите имя"
        error={inputsError.name}
        radius="md"
        required
        onBlur={handleBlur}
      />
      <TextInput
        name="login"
        type="text"
        label="Логин"
        description="Введите логин"
        placeholder="Введите логин"
        icon={<Logo width={15} height={15} />}
        error={inputsError.login}
        radius="md"
        required
        onBlur={handleBlur}
      />
      <TextInput
        name="email"
        type="email"
        label="Email"
        description="Введите почту"
        placeholder="Введите почту"
        error={inputsError.email}
        radius="md"
        required
        onBlur={handleBlur}
      />
      <div className={styled.sex}>
        <label className={styled.label}>Пол</label>
        <p className={styled.description}>Выберите пол</p>
        <div className={styled.sexWrapper}>
          <TextInput
            name="sex"
            type="radio"
            label="Муж"
            value="male"
            checked={sex === 'male'}
            onChange={handleSex}
          />
          <TextInput
            name="sex"
            type="radio"
            label="Жен"
            value="female"
            checked={sex === 'female'}
            onChange={handleSex}
          />
        </div>
      </div>
      <TextInput
        name="password"
        type="password"
        label="Password"
        description="Введите пароль"
        placeholder="Введите пароль"
        error={inputsError.password}
        radius="md"
        required
        onBlur={handleBlur}
      />
      <TextInput
        name="passwordRepeat"
        type="password"
        label="Повтор пароля"
        description="Повторите пароль"
        placeholder="Повторите пароль"
        error={inputsError.passwordRepeat}
        radius="md"
        required
        disabled={!inputsRef.current.password || !!inputsError.password}
        onBlur={handleBlur}
      />
      <button className={styled.button} type="submit" disabled={!!error}>
        Зарегистрироваться
      </button>
      <Link className={styled.link} to={ROUTES.LOGIN}>
        Вход
      </Link>
    </form>
  );
};
