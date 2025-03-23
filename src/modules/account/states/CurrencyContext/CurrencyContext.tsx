import { createContext } from "react";


export interface CurrencyContextValue {
    exchangeRates: { [currency: string]: number };
    loading: boolean;
    error: Error | null;
    refreshExchangeRates: () => void;
    convertCurrency: (amount: number, target: string) => number;
}


export const CurrencyContext = createContext<CurrencyContextValue>({
    exchangeRates: {},
    loading: false,
    error: null,
    refreshExchangeRates: () => { },
    convertCurrency: () => 0
});