import { useState, useEffect } from 'react';
import { getExchangeRate } from '../services/currency.service';

export const useExchangeRate = (base: string, target: string) => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);

      try {

        const fetchedRate = await getExchangeRate(base, target);
        setRate(fetchedRate);

      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    fetchRate();
  }, [base, target]);

  return { rate, loading, error };
};
