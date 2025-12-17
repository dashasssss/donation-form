import { Typography } from '../Typography';
import styles from './PaymentMethods.module.scss';

type Props = {
  label: string;
  Icons: React.FC<React.SVGProps<SVGSVGElement>>[];
  active: boolean;
  onClick: () => void;
};

export const PaymentMethodCard = ({ label, Icons, active, onClick }: Props) => {
  const privatIconsldS = label === 'Приват24';
  const webMoneyIcons = label === 'WebMoney';
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.method} ${active ? styles.active : ''}`}
    >
      <div className={`${styles.iconWrapper} ${privatIconsldS ? styles.scaleIconSmall : ''} ${webMoneyIcons ? styles.scaleIconBig : ''}`}>
        {Icons.map((Icon, index) => (
          <Icon
            key={index}
            className={styles.icon}
          />
        ))}
      </div>
      <Typography
        as="span"
        variant="small"
        className={styles.label}
      >
        {label}
      </Typography>
    </button>
  );
};
