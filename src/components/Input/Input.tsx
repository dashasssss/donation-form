import { forwardRef, type InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import { Typography } from '../Typography';

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={styles.field}>
        {label && (
          <Typography
            as="label"
            variant="small"
            className={styles.label}
            htmlFor={inputId}
          >
            {label}
          </Typography>
        )}

        <input
          ref={ref}  
          id={inputId}
          className={classNames(styles.input, className, {
            [styles.errorInput]: error,
          })}
          {...props}
        />

        {error && (
          <Typography variant="small" className={styles.errorText}>
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
