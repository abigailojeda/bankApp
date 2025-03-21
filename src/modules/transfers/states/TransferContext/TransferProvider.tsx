import React, { useState, useEffect } from 'react';
import { Transfer } from '../../types/transfer.types';
import { getTransfers, addTransferService } from '../../services/transfer.service';
import { TransferContext } from './TransferContext';

interface TransferProviderProps {
  children: React.ReactNode;
}

const TransferProvider: React.FC<TransferProviderProps> = ({ children }) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await getTransfers();
      setTransfers(data);
      calculateTotalIncomes(data);
      calculateTotalExpenses(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  

  const calculateTotalIncomes = (data:Transfer[]) => {
    let total = 0;
    data.forEach((transfer:any) => {
      if (transfer.type === 'deposit') {
        total += transfer.amount;
      }
    });
    setTotalIncomes(total);
  }

  const calculateTotalExpenses = (data:Transfer[]) => {
    let total = 0;
    data.forEach((transfer:Transfer) => {
      if (transfer.type === 'withdrawal') {
        total += transfer.amount;
      }
    });
    setTotalExpenses(total);
  }

  const addTransfer = async (transferData: {
    accountId: string;
    amount: number;
    date?: string;
    type: string;
    description: string;
    currency: string;
  }) => {
    try {
      await addTransferService(transferData);
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <TransferContext.Provider
      value={{
        transfers,
        loading,
        error,
        totalIncomes,
        totalExpenses,
        refreshTransfers: fetchTransfers,
        addTransfer, 
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export default TransferProvider;
