import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  type = 'button',
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
};
