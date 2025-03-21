import React, { useState, useEffect, useContext } from 'react';
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

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await getTransfers();
      setTransfers(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para añadir transferencia
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
        refreshTransfers: fetchTransfers,
        addTransfer, 
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export default TransferProvider;
