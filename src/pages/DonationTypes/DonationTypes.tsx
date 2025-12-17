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
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    setCardNumber((prev) => {
      const updated = [...prev];
      updated[index] = value.slice(0, 4);
      return updated;
    });
  };

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length <= 2) {
      setExpiry(digits);
    } else {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    }
  };

  // const isPaymentValid =
  // cardNumber.every((p) => p.length === 4) &&
  // expiry.length === 5 &&
  // cvc.length === 3;


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
                    {cardNumber.map((part, index) => (
                      <Input
                        key={index}
                        value={part}
                        inputMode="numeric"
                        maxLength={4}
                        onChange={(e) =>
                          handleCardNumberChange(index, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.cardRow}>
                  <Input
                    label="Термін дії"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                  />

                  <Input
                    label="CVC/CVV"
                    type="password"
                    value={cvc}
                    inputMode="numeric"
                    maxLength={3}
                    onChange={(e) =>
                      setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))
                    }
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
