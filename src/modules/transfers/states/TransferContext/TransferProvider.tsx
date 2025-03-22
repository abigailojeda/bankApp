import React, { useState, useEffect, useContext } from 'react';
import { Transfer, TransferResponse } from '../../types/transfer.types';
import { getTransfers, addTransferService } from '../../services/transfer.service';
import { TransferContext } from './TransferContext';
import { formatAmount } from '../../../shared/helpers/formatter';
import { AccountContext } from '../../../account/states/AccountContext';

interface TransferProviderProps {
  children: React.ReactNode;
}

const TransferProvider: React.FC<TransferProviderProps> = ({ children }) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalIncomes, setTotalIncomes] = useState<string>('0');
  const [totalExpenses, setTotalExpenses] = useState<string>('0');
  const { currency: currentCurrency } = useContext(AccountContext);


  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await getTransfers();
      const formattedData = data.map((transfer: TransferResponse) => ({
        ...transfer,
        amount: formatAmount(transfer.amount, transfer.currency),
        current_balance: formatAmount(transfer.current_balance, transfer.currency),
      }));
      setTransfers(formattedData);
      calculateTotalIncomes(data);
      calculateTotalExpenses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));

    } finally {
      setLoading(false);
    }
  };

  const calculateTotalIncomes = (data:TransferResponse[]) => {
    let total = 0;
    data.forEach((transfer:TransferResponse) => {
      if (transfer.type === 'deposit') {
        total += transfer.amount;
      }
    });
    setTotalIncomes(formatAmount(total, currentCurrency));
  }

  const calculateTotalExpenses = (data:TransferResponse[]) => {
    let total = 0;
    data.forEach((transfer:TransferResponse) => {
      if (transfer.type === 'withdrawal') {
        total += transfer.amount;
      }
    });
    setTotalExpenses(formatAmount(total, currentCurrency));
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
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
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
