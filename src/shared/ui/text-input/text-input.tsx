import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './text-input.module.css';
import cn from 'classnames';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'number'
    | 'radio';
  label?: string;
  description?: string;
  // value?: string;
  checked?: boolean;
  error?: string | null;
  required?: boolean;
  icon?: ReactNode;
  size?: Size;
  radius?: Size;
}

export const TextInput = (props: TextInputProps) => {
  const {
    type,
    label,
    description,
    error,
    required,
    icon,
    size = 'md',
    radius = 'xs',
    ...rest
  } = props;

  return (
    <div className={styles.textInput}>
      {label && (
        <label className={cn(styles.label, styles[size])}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {description && (
        <p className={cn(styles.description, styles[`font-small-${size}`])}>
          {description}
        </p>
      )}
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          className={cn(styles.input, styles[size], {
            [styles.error]: error,
            [styles[`radius-${radius}`]]: radius,
          })}
          type={type ?? 'text'}
          required={required}
          {...rest}
        />
        {error && (
          <p className={cn(styles.errorMessage, styles[`font-small-${size}`])}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
