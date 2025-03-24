import { createContext } from 'react';
import { Transfer, TransferAddForm } from '../../types/transfer.types';

export interface TransferContextValue {
  transfers: Transfer[];
  loading: boolean;
  error: Error | null;
  totalIncomes: string;
  totalExpenses: string;
  addTransfer: (transferData: TransferAddForm) => Promise<void>;
  updateTransfer: (transferData: TransferAddForm & { id: string }) => Promise<void>;
  deleteTransfer: (transferId: string) => Promise<void>;
  undoTransfer: (transferId: string) => Promise<void>;
  refreshTransfers: () => Promise<void>;
  validateTransferData: (
    transferData: Record<string, string | number>,
    operation?: 'add' | 'update' | 'undo' | 'delete'
  ) => { [key: string]: string };
  calculateTotalIncomes: () => void;
  calculateTotalExpenses: () => void;
}

export const TransferContext = createContext<TransferContextValue>({
  transfers: [],
  loading: false,
  error: null,
  totalIncomes: '0',
  totalExpenses: '0',
  addTransfer: async () => {},
  updateTransfer: async () => {},
  deleteTransfer: async () => {},
  undoTransfer: async () => {},
  refreshTransfers: async () => {},
  validateTransferData: () => ({}),
  calculateTotalIncomes: () => {},
  calculateTotalExpenses: () => {},
}); 