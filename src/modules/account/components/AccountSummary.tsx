import { useContext } from "react";
import { AccountContext } from "../states/AccountContext";
import { AuthContext } from "../../auth/states/AuthContext/AuthContext";
import { TransferContext } from "../../transfers/states/TransferContext";

export const AccountSummary = () => {
    const { currentBalance, loading, error } = useContext(AccountContext);
    const { user, loading: loadingAuth, error: errorAuth} = useContext(AuthContext);
    const { totalIncomes, totalExpenses } = useContext(TransferContext);

    if (loading || loadingAuth) {
        return <div>Loading...</div>;
    }
    if (error || errorAuth) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div className="card-style h-32">

            <h1>{currentBalance}</h1>
            <h1>{user?.name} {user?.surname}</h1>
            <span>Incomes:</span>
            <span>{totalIncomes}</span>
            <span>Expenses:</span>
            <span>{totalExpenses}</span>
        </div>
    )
}
