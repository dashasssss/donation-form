import { Button } from './components/Button/Button';
import { DonationForm } from './pages/DonationForm/DonationForm';
import { DonationTypes } from './pages/DonationTypes/DonationTypes';

function App() {
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SUBMIT');
  };

  return (
    <main className="container">
      <form
        onSubmit={handleSubmit}
      >
        <DonationForm />
        <DonationTypes />

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
