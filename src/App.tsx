import { useRef, useState } from 'react';
import { Button } from './components/Button/Button';
import { DonationForm } from './pages/DonationForm/DonationForm';
import { DonationTypes } from './pages/DonationTypes/DonationTypes';
import type { DonationFormRef, DonationTypesRef } from './types';
import { Toast } from './components/Toast/Toast';

function App() {
  const donationFormRef = useRef<DonationFormRef | null>(null);
  const donationTypesRef = useRef<DonationTypesRef | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = donationFormRef.current?.validate();
    const isPaymentValid = donationTypesRef.current?.validate();

    if (!isFormValid || !isPaymentValid) {
      return;
    }

    donationFormRef.current?.reset();
    donationTypesRef.current?.reset();

    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <>
      <main className="container">
        <form onSubmit={handleSubmit}>
          <DonationForm ref={donationFormRef} />
          <DonationTypes ref={donationTypesRef} />

          <Button type="submit">Допомогти</Button>
        </form>
      </main>

      <Toast
        message="Дякуємо за вашу допомогу 💜"
        visible={showToast}
      />
    </>
  );
}

export default App;
