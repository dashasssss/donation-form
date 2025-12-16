import { useState } from 'react';
import { Typography } from '../../components/Typography';
import type { DonationType } from '../../types/donation';
import styles from './DonationTypes.module.scss';
import { DonationTypeTabs } from '../../components/DonationTypeTabs';
import { Input } from '../../components/Input/Input';
import { PaymentMethodCard } from '../../components/PaymentMethods/PaymentMethods';
import VisaIcon from '../../assets/icons/visa.svg?react';
import PrivatIcon from '../../assets/icons/privatbank.svg?react';
import TerminalIcon from '../../assets/icons/atm.svg?react';
import WebmoneyIcon from '../../assets/icons/webmoney.svg?react';
import PaypalIcon from '../../assets/icons/paypal.svg?react';
import MastercardIcon from '../../assets/icons/mastercard.svg?react';

export const DonationTypes = () => {
  const [type, setType] = useState<DonationType>('financial');
  type PaymentMethod = 'visa' | 'privat24' | 'terminal' | 'webmoney' | 'paypal';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('privat24');

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <Typography
          as="h2"
          variant="h2"
        >
          Види допомоги
          <Typography
            as="p"
            variant="body"
            className={styles.subtitle}
          >
            Ви можете змінити вид допомоги
          </Typography>
        </Typography>
      </div>

      <div className={`grid ${styles.grid}`}>
        <div className={styles.tabsWrapper}>
          <DonationTypeTabs
            value={type}
            onChange={setType}
          />
        </div>
      </div>

      {type === 'financial' && (
        <section className={styles.paymentSection}>
          <div className={`grid ${styles.paymentGrid}`}>
            <div className={styles.methods}>
              <Typography
                as="h4"
                variant="h4"
              >
                Спосіб оплати
              </Typography>

              <div className={styles.methodsGrid}>
                <PaymentMethodCard
                  label="Карта Visa/MasterCard"
                  Icons={[MastercardIcon, VisaIcon]}
                  active={paymentMethod === 'visa'}
                  onClick={() => setPaymentMethod('visa')}
                />

                <PaymentMethodCard
                  label="Приват24"
                  Icons={[PrivatIcon]}
                  active={paymentMethod === 'privat24'}
                  onClick={() => setPaymentMethod('privat24')}
                />

                <PaymentMethodCard
                  label="Термінали України"
                  Icons={[TerminalIcon]}
                  active={paymentMethod === 'terminal'}
                  onClick={() => setPaymentMethod('terminal')}
                />

                <PaymentMethodCard
                  label="WebMoney"
                  Icons={[WebmoneyIcon]}
                  active={paymentMethod === 'webmoney'}
                  onClick={() => setPaymentMethod('webmoney')}
                />

                <PaymentMethodCard
                  label="PayPal"
                  Icons={[PaypalIcon]}
                  active={paymentMethod === 'paypal'}
                  onClick={() => setPaymentMethod('paypal')}
                />
              </div>
            </div>

            <div className={styles.cardForm}>
              <Typography
                as="h4"
                variant="h4"
              >
                Введіть наступні дані
              </Typography>

              <div className={styles.cardBox}>
                <div className={styles.cardField}>
                  <Typography variant="body">Номер карти</Typography>

                  <div className={styles.cardNumber}>
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                    />
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                    />
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                    />
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className={styles.cardRow}>
                  <Input
                    label="Термін дії"
                    inputMode="numeric"
                  />

                  <Input
                    label="CVC/CVV"
                    type="password"
                    inputMode="numeric"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};
