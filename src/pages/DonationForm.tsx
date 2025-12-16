import { Input } from '../components/Input/Input';
import { Typography } from '../components/Typography';
import styles from './DonationForm.module.scss';
import { DonorTypeSwitch } from '../components/DonorTypeSwitch/DonorTypeSwitch';
import { useState } from 'react';

export const DonationForm = () => {
  const [donorType, setDonorType] = useState<'person' | 'company'>('person');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Typography
            as="h2"
            variant="h2"
          >
            Заповніть форму
          </Typography>
        </div>

        <div className={styles.switchWrapper}>
          <DonorTypeSwitch
            value={donorType}
            onChange={setDonorType}
          />
        </div>

        <form className={`grid ${styles.grid}`}>
          <div className={styles.left}>
            <div className={styles.row2}>
              <Input label="Імʼя" />
              <Input label="Фамілія" />
            </div>
            <div className={styles.field}>
              <div className={styles.inputWrap}>
                <Input label="Назва компанії, організації" />

                <button
                  type="button"
                  className={styles.logoButton}
                >
                  <span>+</span> Логотип
                </button>
              </div>
            </div>

            <Input label="Email-адрес" />
            <Input label="Номер телефону" />
          </div>

          <div className={styles.right}>
            <Input label="Країна" />
            <div className={styles.row2}>
              <Input label="Місто" />
              <Input label="Штат, район" />
            </div>
            <Input label="Адреса" />
            <div className={styles.row2}>
              <Input label="Поштовий індекс" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
