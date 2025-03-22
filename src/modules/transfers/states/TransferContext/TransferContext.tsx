import { createContext } from 'react';
import { TransferResponse } from '../../types/transfer.types';

export interface TransferContextValue {
    transfers: TransferResponse[];
    loading: boolean;
    error: Error | null;
    totalIncomes?: number;
    totalExpenses?: number;
    refreshTransfers: () => void;
    addTransfer: (transferData: {
        accountId: string;
        amount: number;
        date?: string;
        type: string;
        description: string;
        currency: string;
    }) => void;
}

export const TransferContext = createContext<TransferContextValue>({
    transfers: [],
    totalIncomes:0,
    totalExpenses:0,
    loading: false,
    error: null,
    refreshTransfers: () => { },
    addTransfer: () => { },
});
