import { Typography } from "../Typography";
import styles from './EmptyState.module.scss';

export const DonationEmptyState = () => {
  return (
    <section className={styles.emptyState}>
          <div className={styles.emptyWrapper}>
            <Typography
              as="h4"
              variant="h4"
            >
              Цей вид допомоги поки недоступний
            </Typography>

            <Typography
              as="p"
              variant="body"
              className={styles.emptyText}
            >
              Ви можете обрати фінансову допомогу або повернутися пізніше.
            </Typography>
          </div>
        </section>
  );
};