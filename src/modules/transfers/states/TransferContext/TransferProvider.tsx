import React, { useState, useEffect, useContext } from 'react';
import { Transfer, TransferResponse } from '../../types/transfer.types';
import { getTransfers, addTransferService } from '../../services/transfer.service';
import { TransferContext } from './TransferContext';
import { formatAmountDisplayed } from '../../../shared/helpers/formatter';
import { AccountContext } from '../../../account/states/AccountContext';
import { CurrencyContext } from '../../../account/states/CurrencyContext';

interface TransferProviderProps {
  children: React.ReactNode;
}

const TransferProvider: React.FC<TransferProviderProps> = ({ children }) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [transfersResponse, setTransfersResponse] = useState<TransferResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalIncomes, setTotalIncomes] = useState<string>('0');
  const [totalExpenses, setTotalExpenses] = useState<string>('0');
  const { currency: currentCurrency } = useContext(AccountContext);
  const { convertCurrency, exchangeRates } = useContext(CurrencyContext);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await getTransfers();
      setTransfersResponse(data);
      const formattedData = data.map((transfer: TransferResponse) => ({
        ...transfer,
        amount: formatAmountDisplayed(transfer.amount, transfer.currency),
        current_balance: formatAmountDisplayed(transfer.current_balance, transfer.currency),
      }));
      setTransfers(formattedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));

    } finally {
      setLoading(false);
    }
  };

  const calculateTotalIncomes = () => {
    let total = 0;
    transfersResponse.forEach((transfer:TransferResponse) => {
      if (transfer.type === 'deposit') {
        total += transfer.amount;
      }
    });
    total = convertCurrency(total, currentCurrency) 
    setTotalIncomes(formatAmountDisplayed(total, currentCurrency));
  }

  const calculateTotalExpenses = () => {
    let total = 0;
    transfersResponse.forEach((transfer:TransferResponse) => {
      if (transfer.type === 'withdrawal') {
        total += transfer.amount;
      }
    });
    total = convertCurrency(total, currentCurrency)
    setTotalExpenses(formatAmountDisplayed(total, currentCurrency));
  }

  const addTransfer = async (transferData: {
    accountId: number;
    amount: number;
    date?: string;
    type: string;
    description: string;
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

  useEffect(() => {
    calculateTotalIncomes();
    calculateTotalExpenses();
  }, [transfersResponse, currentCurrency, exchangeRates]);  

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
        calculateTotalIncomes,
        calculateTotalExpenses
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export default TransferProvider;
