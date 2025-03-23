import { createContext } from 'react';
import { Transfer } from '../../types/transfer.types';

export interface TransferContextValue {
    transfers: Transfer[];
    loading: boolean;
    error: Error | null;
    totalIncomes?: string;
    totalExpenses?: string;
    refreshTransfers: () => void;
    addTransfer: (transferData: {
        accountId: number;
        amount: number;
        date?: string;
        type: string;
        description: string;
    }) => void;
    updateTransfer: (transferData: {
        id: string;
        accountId: number;
        amount: number;
        date?: string;
        type: string;
        description: string;
    }) => void;
    deleteTransfer: (transferId: string) => void;
    undoTransfer: (transferId: string) => void;
    calculateTotalIncomes: () => void;
    calculateTotalExpenses: () => void;
}

export const TransferContext = createContext<TransferContextValue>({
    transfers: [],
    totalIncomes: '0',
    totalExpenses: '0',
    loading: false,
    error: null,
    refreshTransfers: () => { },
    addTransfer: () => { },
    updateTransfer: () => { },
    deleteTransfer: () => { },
    undoTransfer: () => { },
    calculateTotalIncomes: () => { },
    calculateTotalExpenses: () => { }
});
