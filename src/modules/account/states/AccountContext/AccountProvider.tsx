import { useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";
import { getAccounts } from "../../services/account.service";
import { Account } from "../../types/account.type";

interface AccountProviderProps {
    children: React.ReactNode;
}

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentBalance, setCurrentBalance] = useState<number>(0);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const data = await getAccounts();
            setAccounts(data);
            setCurrentBalance(data[0].current_balance);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateCurrentBalance = (newBalance: number) => {
        setCurrentBalance(newBalance);
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
                currentBalance: currentBalance || 0,
                iban: accounts[0]?.iban || '',
                currency: accounts[0]?.currency || '',
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