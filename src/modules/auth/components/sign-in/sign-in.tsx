import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FocusEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../../../../ui/text-input';
import { Validators } from '../../../../core/helpers/validators.helpers';
import { ROUTES } from '../../../../core/enums';
import styled from './signin.module.css';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email: string | null;
  password: string | null;
}

interface SigninProps {
  error: string | null;
  resetErrorSubmit: () => void;
  onSubmit: (values: FormValues) => void;
}

export const Signin = ({
  error: errorSubmit,
  resetErrorSubmit,
  onSubmit,
}: SigninProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputsRef = useRef<FormValues>({
    email: '',
    password: '',
  });

  const [inputsError, setInputsError] = useState<FormErrors>({
    email: null,
    password: null,
  });

  const error = inputsError.email || inputsError.password;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputsValue = inputsRef.current;
    const emailError = Validators.validateEmail(inputsValue.email);
    const passwordError = Validators.validatePassword(inputsValue.password);

    if (emailError || passwordError) {
      setInputsError({ email: emailError, password: passwordError });

      return;
    }

    onSubmit(inputsValue);
    formRef.current?.reset();
  };

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    inputsRef.current = {
      ...inputsRef.current,
      [event.target.name]: event.target.value,
    };

    setInputsError((prev) => ({ ...prev, [event.target.name]: null }));
    resetErrorSubmit();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let error: string | null = null;

    switch (name) {
      case 'email':
        error = Validators.validateEmail(value);
        break;
      case 'password':
        error = Validators.validatePassword(value);
        break;
    }

    if (error) {
      setInputsError((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleReset = () => {
    inputsRef.current = {
      email: '',
      password: '',
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
      <h2>Вход</h2>
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
      <button className={styled.button} type="submit" disabled={!!error}>
        Войти
      </button>
      <Link className={styled.link} to={ROUTES.REGISTER}>
        Регистрация
      </Link>
      <p className={styled.error}>{errorSubmit}</p>
    </form>
  );
};
