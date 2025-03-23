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
        accountId: string;
        amount: number;
        date?: string;
        type: string;
        description: string;
    }) => void;
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
    calculateTotalIncomes: () => { },
    calculateTotalExpenses: () => { }
});
