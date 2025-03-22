import { useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";
import { getAccounts } from "../../services/account.service";
import { Account, AccountResponse } from "../../types/account.type";
import { formatAmountDisplayed } from "../../../shared/helpers/formatter";

interface AccountProviderProps {
    children: React.ReactNode;
}

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentBalance, setCurrentBalance] = useState<string>('0');
    const [currentCurrency, setCurrentCurrency] = useState<string>('EUR');

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const data = await getAccounts();
            setAccounts(data.map((account: AccountResponse) => ({
                ...account,
                current_balance: formatAmountDisplayed(account.current_balance, account.currency)
            })));
            setCurrentBalance(formatAmountDisplayed(data[0].current_balance, data[0].currency));
            setCurrentCurrency(data[0].currency);
            
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    };

    const updateCurrentBalance = (newBalance: number) => {
        setCurrentBalance(formatAmountDisplayed(newBalance, accounts[0].currency));
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <AccountContext.Provider
            value={{
                accounts,
                //for this example, we are using the first account in the array
                currentAccount: accounts[0] || null,
                currentBalance: currentBalance || '0',
                iban: accounts[0]?.iban || '',
                currency: currentCurrency || '',
                loading,
                error,
                refreshAccounts: fetchAccounts,
                updateCurrentBalance
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;