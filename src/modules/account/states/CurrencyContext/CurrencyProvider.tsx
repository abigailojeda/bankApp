import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { getAllExchangeRates } from "../../services/currency.service";
import { AccountContext } from "../AccountContext";


interface CurrencyProviderProps {
    children: React.ReactNode;
}

const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [currencyRates, setCurrencyRates] = useState<{ [currency: string]: number }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { currency } = useContext(AccountContext);

    const fetchCurrencyRates = async () => {
        setLoading(true);
        try {
            const data = await getAllExchangeRates(currency);
            setCurrencyRates(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrencyRates();
    }, [currency]);

    const convertCurrency = (
        amount: number,
        target: string
    ): number => {
        //! Floating point arithmetic is imprecise for currency, but the free API doesn't support conversions, temporarily using this method
        const rate = currencyRates[target];
        return amount * rate;
    };

    return (
        <CurrencyContext.Provider
            value={{
                exchangeRates: currencyRates,
                loading,
                error,
                refreshExchangeRates: fetchCurrencyRates,
                convertCurrency
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
