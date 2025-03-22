import React, { useEffect, useState } from 'react';
import { getAllExchangeRates } from '../services/currency.service';

const ExchangeRatesList: React.FC = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const fetchedRates = await getAllExchangeRates('eur');
        setRates(fetchedRates);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {Object.entries(rates).map(([currency, rate]) => (
        <li key={currency}>
          {currency.toUpperCase()}: {rate}
        </li>
      ))}
    </ul>
  );
};

export default ExchangeRatesList;
