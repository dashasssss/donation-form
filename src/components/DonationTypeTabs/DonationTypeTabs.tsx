import type { DonationType } from '../../types/donation';
import styles from './DonationTypeTabs.module.scss';
import HandIcon from '../../assets/icons/hand.svg?react';
import WalletIcon from '../../assets/icons/wallet.svg?react';
import ShirtIcon from '../../assets/icons/shirt.svg?react';
import HeartIcon from '../../assets/icons/heart.svg?react';

type Props = {
  value: DonationType;
  onChange: (type: DonationType) => void;
};

type TabConfig = {
  id: DonationType;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const tabs: TabConfig[] = [
  { id: 'action', label: 'Зробити', Icon: HandIcon },
  { id: 'financial', label: 'Фінансова допомога', Icon: WalletIcon },
  { id: 'material', label: 'Матеріальна допомога', Icon: ShirtIcon },
  { id: 'volunteer', label: 'Волонтерство', Icon: HeartIcon },
];

export const DonationTypeTabs = ({ value, onChange }: Props) => {
  return (
    <>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = value === id;

        return (
          <button
            key={id}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(id)}
          >
            <span className={styles.icon}>
              <Icon />
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </>
  );
};
