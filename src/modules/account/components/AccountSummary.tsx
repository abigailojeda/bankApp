import { useContext } from "react";
import { AccountContext } from "../states/AccountContext";
import { AuthContext } from "../../auth/states/AuthContext/AuthContext";
import { TransferContext } from "../../transfers/states/TransferContext";
import { IncreaseIcon } from "../../shared/components/icons/IncreaseIcon";
import { DecreaseIcon } from "../../shared/components/icons/DecreaseIcon";
import { Dropdown } from "../../shared/components/Dropdown";
import { CurrencyContext } from "../states/CurrencyContext";
import RealtimeCurrencyNotifier from "./RealtimeCurrencyNotifier";
import { formatStringNumber } from "../../shared/helpers/formatter";

export const AccountSummary = () => {
    const { currentBalance, currency, loading, error, updateCurrency } = useContext(AccountContext);
    const { user, loading: loadingAuth, error: errorAuth } = useContext(AuthContext);
    const { totalIncomes, totalExpenses, calculateTotalIncomes, calculateTotalExpenses } = useContext(TransferContext);
    const { exchangeRates, convertCurrency } = useContext(CurrencyContext);

    if (loading || loadingAuth) {
        return <div>Loading...</div>;
    }
    if (error || errorAuth) {
        return <div>Error: {error?.message}</div>;
    }

    const currencyOptions = Object.keys(exchangeRates).map((key) => ({
        label: key.toUpperCase(),
        value: key,
    }));

    const handleUpdateCurrency = async (currency: string) => {
        try {
            const balance = convertCurrency(formatStringNumber(currentBalance), currency);
            calculateTotalIncomes();
            calculateTotalExpenses();
            await updateCurrency(balance, currency);

        } catch (err) {
          console.error('Error addiUpdateCurrency:', err);
        }
    };



    return (
        <div className="card-style flex flex-col ">
            <RealtimeCurrencyNotifier />
            <div className="flex w-full justify-between">


                <div className="text-subtitle">
                    <span>{user?.name} {user?.surname}</span>
                </div>


               <div className="w-fit">
               <Dropdown
                    options={currencyOptions}
                    value={currency}
                    onSelect={handleUpdateCurrency}
                    searchable={true}
                    hasActionButton={true}
                />
               </div>

            </div>


            <div>
                <p className="text-3xl leading-7 mt-4 text-text font-semibold">{currentBalance}</p>

                {/* <p>
                        aaa
                    </p> */}
            </div>

            <div className="flex items-end justify-end sm:flex-nowrap flex-wrap gap-2 border-t dark:border-bg border-gray pt-4 mt-4 text-sm">
                <div className="dark:text-greenpale text-green flex items-center">
                    <IncreaseIcon width="20px" height="20px" />
                    <span>{totalIncomes}</span>
                </div>
                <div className="dark:text-redpale text-red sm:ml-2 flex items-center">
                    <DecreaseIcon width="20px" height="20px" />
                    <span>{totalExpenses}</span>
                </div>
            </div>
        </div>
    )
}
