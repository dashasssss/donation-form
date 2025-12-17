import styles from './Toast.module.scss';

type Props = {
  message: string;
  visible: boolean;
};

export const Toast = ({ message, visible }: Props) => {
  if (!visible) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
};
