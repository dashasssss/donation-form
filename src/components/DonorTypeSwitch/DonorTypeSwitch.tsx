import clsx from 'clsx';
import styles from './DonorTypeSwitch.module.scss';
import type { DonorType } from '../../types/donor';


interface Props {
  value: DonorType;
  onChange: (value: DonorType) => void;
}

export const DonorTypeSwitch = ({ value, onChange }: Props) => {
  return (
    <div className={styles.switch}>
      <button
        type="button"
        className={clsx(
          styles.option,
          value === 'person' && styles.active,
        )}
        onClick={() => onChange('person')}
      >
        Фіз. особа
      </button>

      <button
        type="button"
        className={clsx(
          styles.option,
          value === 'company' && styles.active,
        )}
        onClick={() => onChange('company')}
      >
        Юр. особа
      </button>
    </div>
  );
};
