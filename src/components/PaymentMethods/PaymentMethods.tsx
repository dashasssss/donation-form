import styles from './PaymentMethods.module.scss';
import { PaymentMethodCard } from '../PaymentMethodCard/PaymentMethodCard';
import VisaIcon from '../../assets/icons/visa.svg?react';
import PrivatIcon from '../../assets/icons/privatbank.svg?react';
import TerminalIcon from '../../assets/icons/atm.svg?react';
import WebmoneyIcon from '../../assets/icons/webmoney.svg?react';
import PaypalIcon from '../../assets/icons/paypal.svg?react';
import MastercardIcon from '../../assets/icons/mastercard.svg?react';
import { Typography } from '../Typography';
import type { PaymentMethod } from '../../types';

type Props = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

export const PaymentMethods = ({ value, onChange }: Props) => {
  return (
    <div className={styles.methods}>
      <Typography as="h4" variant="h4">
        Спосіб оплати
      </Typography>

      <div className={styles.methodsGrid}>
        <PaymentMethodCard
          label="Карта Visa/MasterCard"
          Icons={[MastercardIcon, VisaIcon]}
          active={value === 'visa'}
          onClick={() => onChange('visa')}
        />

        <PaymentMethodCard
          label="Приват24"
          Icons={[PrivatIcon]}
          active={value === 'privat24'}
          onClick={() => onChange('privat24')}
        />

        <PaymentMethodCard
          label="Термінали України"
          Icons={[TerminalIcon]}
          active={value === 'terminal'}
          onClick={() => onChange('terminal')}
        />

        <PaymentMethodCard
          label="WebMoney"
          Icons={[WebmoneyIcon]}
          active={value === 'webmoney'}
          onClick={() => onChange('webmoney')}
        />

        <PaymentMethodCard
          label="PayPal"
          Icons={[PaypalIcon]}
          active={value === 'paypal'}
          onClick={() => onChange('paypal')}
        />
      </div>
    </div>
  );
};
