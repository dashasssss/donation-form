import { Input } from '../../components/Input/Input';
import { Typography } from '../../components/Typography';
import styles from './DonationForm.module.scss';
import { DonorTypeSwitch } from '../../components/DonorTypeSwitch/DonorTypeSwitch';
import { DONOR_TYPES, type DonorType } from '../../types';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from 'react';
import clsx from 'clsx';

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

type DonationFormRef = {
  reset: () => void;
  validate: () => boolean;
};

export const DonationForm = forwardRef<DonationFormRef>((_, ref) => {
  const [donorType, setDonorType] = useState<DonorType>(DONOR_TYPES.PERSON);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    inputRefs.current.firstName?.focus();
  }, []);

  const LETTERS_REGEX = /^[A-Za-zА-Яа-яІіЇїЄєҐґʼ’\- ]+$/;

  const required = (value: string) => (value.trim() ? null : 'Required');

  const onlyLetters = (value: string) =>
    LETTERS_REGEX.test(value) ? null : 'Only letters allowed';

  const requiredLetters = (value: string) =>
    required(value) || onlyLetters(value);

  const validators: Record<FieldName, (value: string) => string | null> = {
    firstName: requiredLetters,
    lastName: requiredLetters,
    country: requiredLetters,
    state: requiredLetters,
    city: requiredLetters,

    companyName: required,
    address: required,

    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Invalid email',

    phone: (v) => (/^\+?\d{9,15}$/.test(v) ? null : 'Invalid phone number'),

    zip: (v) => (/^\d{4,10}$/.test(v) ? null : 'Invalid ZIP'),
  };

  useImperativeHandle(ref, () => ({
    reset() {
      setValues({
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

      setErrors({
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

      requestAnimationFrame(() => {
        inputRefs.current.firstName?.focus();
      });
    },

    validate() {
      let isValid = true;
      const newErrors: typeof errors = { ...errors };

      (Object.keys(values) as FieldName[]).forEach((field) => {
        const error = validators[field](values[field]);
        newErrors[field] = error;

        if (error && isValid) {
          isValid = false;

          requestAnimationFrame(() => {
            inputRefs.current[field]?.focus();
          });
        }
      });

      setErrors(newErrors);
      return isValid;
    },
  }));

  const handleChange =
  (field: FieldName) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValues((v) => ({
      ...v,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validators[field](value),
    }));
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
        : <div className={clsx('grid', styles.grid)}>
            <div className={styles.left}>
              <div className={styles.row2}>
                <Input
                  label="Імʼя"
                  value={values.firstName}
                  error={errors.firstName ?? undefined}
                  ref={(el) => {
                    inputRefs.current.firstName = el;
                  }}
                  onChange={handleChange('firstName')}
                  onKeyDown={handleEnter('firstName', 'lastName')}
                />
                <Input
                  label="Фамілія"
                  placeholder=" "
                  value={values.lastName}
                  error={errors.lastName ?? undefined}
                  ref={(el) => {
                    inputRefs.current.lastName = el;
                  }}
                  onChange={handleChange('lastName')}
                  onKeyDown={handleEnter('lastName', 'companyName')}
                />
              </div>
              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <Input
                    label="Назва компанії, організації"
                    placeholder=" "
                    value={values.companyName}
                    error={errors.companyName ?? undefined}
                    ref={(el) => {
                      inputRefs.current.companyName = el;
                    }}
                    onChange={handleChange('companyName')}
                    onKeyDown={handleEnter('companyName', 'email')}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={logoInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setLogoFile(file);
                    }}
                  />

                  <button
                    type="button"
                    className={styles.logoButton}
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <span>{logoFile ? '✓' : '+'}</span> Логотип
                  </button>
                </div>
              </div>

              <Input
                label="Email-адрес"
                value={values.email}
                placeholder=" "
                error={errors.email ?? undefined}
                ref={(el) => {
                  inputRefs.current.email = el;
                }}
                onChange={handleChange('email')}
                onKeyDown={handleEnter('email', 'phone')}
              />
              <Input
                label="Номер телефону"
                value={values.phone}
                placeholder=" "
                error={errors.phone ?? undefined}
                ref={(el) => {
                  inputRefs.current.phone = el;
                }}
                onChange={handleChange('phone')}
                onKeyDown={handleEnter('phone', 'country')}
              />
            </div>

            <div className={styles.right}>
              <Input
                label="Країна"
                value={values.country}
                placeholder=" "
                error={errors.country ?? undefined}
                ref={(el) => {
                  inputRefs.current.country = el;
                }}
                onChange={handleChange('country')}
                onKeyDown={handleEnter('country', 'city')}
              />
              <div className={styles.row2}>
                <Input
                  label="Місто"
                  placeholder=" "
                  value={values.city}
                  error={errors.city ?? undefined}
                  ref={(el) => {
                    inputRefs.current.city = el;
                  }}
                  onChange={handleChange('city')}
                  onKeyDown={handleEnter('city', 'state')}
                />

                <Input
                  label="Штат, район"
                  value={values.state}
                  placeholder=" "
                  error={errors.state ?? undefined}
                  ref={(el) => {
                    inputRefs.current.state = el;
                  }}
                  onChange={handleChange('state')}
                  onKeyDown={handleEnter('state', 'address')}
                />
              </div>
              <Input
                label="Адреса"
                placeholder=" "
                value={values.address}
                error={errors.address ?? undefined}
                ref={(el) => {
                  inputRefs.current.address = el;
                }}
                onChange={handleChange('address')}
                onKeyDown={handleEnter('address', 'zip')}
              />
              <div className={styles.row2}>
                <Input
                  label="Поштовий індекс"
                  placeholder=" "
                  value={values.zip}
                  error={errors.zip ?? undefined}
                  ref={(el) => {
                    inputRefs.current.zip = el;
                  }}
                  onChange={handleChange('zip')}
                  onKeyDown={handleEnter('zip')}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
});
