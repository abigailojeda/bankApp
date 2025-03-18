import { createContext } from 'react';
import { Transfer } from '../../utils/transfer.types';

export interface TransferContextValue {
    transfers: Transfer[];
    loading: boolean;
    error: Error | null;
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
    loading: false,
    error: null,
    refreshTransfers: () => { },
    addTransfer: () => { },
});
