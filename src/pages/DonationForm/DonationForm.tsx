import { Input } from '../../components/Input/Input';
import { Typography } from '../../components/Typography';
import styles from './DonationForm.module.scss';
import { DonorTypeSwitch } from '../../components/DonorTypeSwitch/DonorTypeSwitch';
import { useState } from 'react';
import { useRef } from 'react';

type FieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'city'
  | 'zip'
  | 'companyName'
  | 'country'
  | 'state'
  | 'address';

export const DonationForm = () => {
  const [donorType, setDonorType] = useState<'person' | 'company'>('person');
  const [values, setValues] = useState<Record<FieldName, string>>({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    state: '',
    address: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
  });

  const [errors, setErrors] = useState<Record<FieldName, string | null>>({
    firstName: null,
    lastName: null,
    companyName: null,
    email: null,
    phone: null,
    country: null,
    state: null,
    address: null,
    city: null,
    zip: null,
  });

  const inputRefs = useRef<Record<FieldName, HTMLInputElement | null>>({
    firstName: null,
    lastName: null,
    companyName: null,
    email: null,
    phone: null,
    country: null,
    state: null,
    address: null,
    city: null,
    zip: null,
  });

  const validators: Record<FieldName, (value: string) => string | null> = {
    firstName: (v) => {
      const value = v.trim();

      if (!value) {
        return 'Required';
      }

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/.test(value)) {
        return 'Only letters allowed';
      }

      return null;
    },

    lastName: (v) => {
      const value = v.trim();

      if (!value) {
        return 'Required';
      }

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/.test(value)) {
        return 'Only letters allowed';
      }

      return null;
    },

    companyName: (v) => (v.trim() ? null : 'Required'),

    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Invalid email',

    phone: (v) => (/^\+?\d{9,15}$/.test(v) ? null : 'Invalid phone number'),

    country: (v) => {
      const value = v.trim();

      if (!value) {
        return 'Required';
      }

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/.test(value)) {
        return 'Only letters allowed';
      }

      return null;
    },

    state: (v) => {
      const value = v.trim();

      if (!value) {
        return 'Required';
      }

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/.test(value)) {
        return 'Only letters allowed';
      }

      return null;
    },

    city: (v) => {
      const value = v.trim();

      if (!value) {
        return 'Required';
      }

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/.test(value)) {
        return 'Only letters allowed';
      }

      return null;
    },

    address: (v) => (v.trim() ? null : 'Required'),

    zip: (v) => (/^\d{4,10}$/.test(v) ? null : 'Invalid ZIP'),
  };

  const handleEnter =
    (field: FieldName, nextField?: FieldName) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;

      e.preventDefault();

      const value = values[field];
      const error = validators[field](value);

      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
        return;
      }

      setErrors((prev) => ({ ...prev, [field]: null }));

      if (nextField) {
        inputRefs.current[nextField]?.focus();
      }
    };

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

        {donorType === 'company' ?
          <div className={styles.comingSoon}>
            <Typography
              as="h3"
              variant="h3"
            >
              Oops 🙈
            </Typography>

            <Typography variant="body">
              The form is currently under development.
            </Typography>
          </div>
        : <div className={`grid ${styles.grid}`}>
            <div className={styles.left}>
              <div className={styles.row2}>
                <Input
                  label="Імʼя"
                  value={values.firstName}
                  error={errors.firstName ?? undefined}
                  ref={(el) => (inputRefs.current.firstName = el)}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, firstName: e.target.value }))
                  }
                  onKeyDown={handleEnter('firstName', 'lastName')}
                />
                <Input
                  label="Фамілія"
                  value={values.lastName}
                  error={errors.lastName ?? undefined}
                  ref={(el) => (inputRefs.current.lastName = el)}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, lastName: e.target.value }))
                  }
                  onKeyDown={handleEnter('lastName', 'companyName')}
                />
              </div>
              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <Input
                    label="Назва компанії, організації"
                    value={values.companyName}
                    error={errors.companyName ?? undefined}
                    ref={(el) => {
                      inputRefs.current.companyName = el;
                    }}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, companyName: e.target.value }))
                    }
                    onKeyDown={handleEnter('companyName', 'email')}
                  />

                  <button
                    type="button"
                    className={styles.logoButton}
                  >
                    <span>+</span> Логотип
                  </button>
                </div>
              </div>

              <Input
                label="Email-адрес"
                value={values.email}
                error={errors.email ?? undefined}
                ref={(el) => (inputRefs.current.email = el)}
                onChange={(e) =>
                  setValues((v) => ({ ...v, email: e.target.value }))
                }
                onKeyDown={handleEnter('email', 'phone')}
              />
              <Input
                label="Номер телефону"
                value={values.phone}
                error={errors.phone ?? undefined}
                ref={(el) => (inputRefs.current.phone = el)}
                onChange={(e) =>
                  setValues((v) => ({ ...v, phone: e.target.value }))
                }
                onKeyDown={handleEnter('phone', 'country')}
              />
            </div>

            <div className={styles.right}>
              <Input
                label="Країна"
                value={values.country}
                error={errors.country ?? undefined}
                ref={(el) => (inputRefs.current.country = el)}
                onChange={(e) =>
                  setValues((v) => ({ ...v, country: e.target.value }))
                }
                onKeyDown={handleEnter('country', 'city')}
              />
              <div className={styles.row2}>
                <Input
                  label="Місто"
                  value={values.city}
                  error={errors.city ?? undefined}
                  ref={(el) => (inputRefs.current.city = el)}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, city: e.target.value }))
                  }
                  onKeyDown={handleEnter('city', 'state')}
                />

                <Input
                  label="Штат, район"
                  value={values.state}
                  error={errors.state ?? undefined}
                  ref={(el) => {
                    inputRefs.current.state = el;
                  }}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, state: e.target.value }))
                    }
                  onKeyDown={handleEnter('state', 'address')}
                />
              </div>
              <Input
                label="Адреса"
                value={values.address}
                error={errors.address ?? undefined}
                ref={(el) => {
                  inputRefs.current.address = el;
                }}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, address: e.target.value }))
                  }
                onKeyDown={handleEnter('address', 'zip')}
              />
              <div className={styles.row2}>
                <Input
                  label="Поштовий індекс"
                  value={values.zip}
                  error={errors.zip ?? undefined}
                  ref={(el) => {
                    inputRefs.current.zip = el;
                  }}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, zip: e.target.value }))
                    }
                  onKeyDown={handleEnter('zip')}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};
