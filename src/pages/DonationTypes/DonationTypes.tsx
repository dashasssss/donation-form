import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Typography } from '../../components/Typography';
import type { DonationType } from '../../types';
import styles from './DonationTypes.module.scss';
import { DonationTypeTabs } from '../../components/DonationTypeTabs';
import { Input } from '../../components/Input/Input';
import clsx from 'clsx';
import { PaymentMethods } from '../../components/PaymentMethods/PaymentMethods';
import { DonationEmptyState } from '../../components/EmptyState/EmptyState';
import type { PaymentMethod } from '../../types';


type DonationTypesRef = {
  reset: () => void;
  validate: () => boolean;
};

export const DonationTypes = forwardRef<DonationTypesRef>((_, ref) => {
  const [type, setType] = useState<DonationType>('financial');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('privat24');
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const cardRefs = useRef<Array<HTMLInputElement | null>>([]);
  const expiryRef = useRef<HTMLInputElement | null>(null);
  const cvcRef = useRef<HTMLInputElement | null>(null);

  const handleCardNumberChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const clean = value.slice(0, 4);

    setCardNumber((prev) => {
      const updated = [...prev];
      updated[index] = clean;
      return updated;
    });

    if (clean.length === 4) {
      if (index < 3) {
        cardRefs.current[index + 1]?.focus();
      } else {
        expiryRef.current?.focus();
      }
    }
  };

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length <= 2) {
      setExpiry(digits);
    } else {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    }

    if (digits.length === 4) {
      cvcRef.current?.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    reset() {
      setPaymentMethod('privat24');
      setCardNumber(['', '', '', '']);
      setExpiry('');
      setCvc('');
    },

    validate() {
      if (type !== 'financial') return true;

      if (cardNumber.some((n) => n.length !== 4)) {
        cardRefs.current[0]?.focus();
        return false;
      }

      if (expiry.length !== 5) {
        expiryRef.current?.focus();
        return false;
      }

      if (cvc.length !== 3) {
        cvcRef.current?.focus();
        return false;
      }

      return true;
    },
  }));

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

      <div className={clsx('grid', styles.grid)}>
        <div className={styles.tabsWrapper}>
          <DonationTypeTabs
            value={type}
            onChange={setType}
          />
        </div>
      </div>

      {type === 'financial' ?
        <section className={styles.paymentSection}>
          <div className={`grid ${styles.paymentGrid}`}>
            <div className={styles.methods}>
              <PaymentMethods
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>

            <div
              className={clsx(styles.cardForm, {
                [styles.visible]:
                  paymentMethod === 'visa' || paymentMethod === 'privat24',
                [styles.hidden]:
                  paymentMethod !== 'visa' && paymentMethod !== 'privat24',
              })}
            >
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
                        placeholder=" "
                        value={part}
                        inputMode="numeric"
                        maxLength={4}
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
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
                    placeholder=" "
                    inputMode="numeric"
                    value={expiry}
                    ref={expiryRef}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                  />

                  <Input
                    label="CVC/CVV"
                    placeholder=" "
                    type="password"
                    value={cvc}
                    inputMode="numeric"
                    maxLength={3}
                    ref={cvcRef}
                    onChange={(e) =>
                      setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      : <DonationEmptyState />}
    </section>
  );
});
