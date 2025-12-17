import { useRef } from 'react';
import { Button } from './components/Button/Button';
import { DonationForm } from './pages/DonationForm/DonationForm';
import { DonationTypes } from './pages/DonationTypes/DonationTypes';

type DonationFormRef = {
  reset: () => void;
  validate: () => boolean;
};

type DonationTypesRef = {
  reset: () => void;
  validate: () => boolean;
};

function App() {
  const donationFormRef = useRef<DonationFormRef | null>(null);
  const donationTypesRef = useRef<DonationTypesRef | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = donationFormRef.current?.validate();
    const isPaymentValid = donationTypesRef.current?.validate();

    if (!isFormValid || !isPaymentValid) {
      return;
    }

    donationFormRef.current?.reset();
    donationTypesRef.current?.reset();

    console.log('SUBMIT');
  };

  return (
    <main className="container">
      <form onSubmit={handleSubmit}>
        <DonationForm ref={donationFormRef} />
        <DonationTypes ref={donationTypesRef} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '80px 0',
          }}
        >
          <Button type="submit">Допомогти</Button>
        </div>
      </form>
    </main>
  );
}

export default App;
