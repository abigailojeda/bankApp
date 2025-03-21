import { useContext } from "react";
import { AccountContext } from "../states/AccountContext";

export const AccountSummary = () => {
    const { currentAccount, currentBalance, loading, error } = useContext(AccountContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="card-style">

            <h1>{currentBalance}</h1>
        </div>
    )
}
