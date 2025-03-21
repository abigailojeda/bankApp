import { createContext } from "react";
import { Account } from "../../types/account.type";

export interface AccountContextValue{
    accounts: Account[];
    currentAccount: Account | null;
    currentBalance: number;
    iban: string;
    currency: string;
    loading: boolean;
    error: Error | null;
    refreshAccounts: () => void;
    updateCurrentBalance: (newBalance: number) => void;
}
     

export const AccountContext = createContext<AccountContextValue>({
    accounts: [],
    currentAccount: null,
    currentBalance: 0,
    iban: '',
    currency: '',
    loading: false,
    error: null,
    refreshAccounts: () => { },
    updateCurrentBalance: () => { },
    
});