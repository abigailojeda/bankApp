import { useContext } from "react";
import { AccountContext } from "../states/AccountContext";
import { AuthContext } from "../../auth/states/AuthContext/AuthContext";
import { TransferContext } from "../../transfers/states/TransferContext";
import { IncreaseIcon } from "../../shared/components/icons/IncreaseIcon";
import { DecreaseIcon } from "../../shared/components/icons/DecreaseIcon";
import { ActionButton } from "../../shared/components/ActionButton";

export const AccountSummary = () => {
    const { currentBalance, currency, loading, error } = useContext(AccountContext);
    const { user, loading: loadingAuth, error: errorAuth } = useContext(AuthContext);
    const { totalIncomes, totalExpenses } = useContext(TransferContext);

    if (loading || loadingAuth) {
        return <div>Loading...</div>;
    }
    if (error || errorAuth) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div className="card-style h-48 flex flex-col justify-between ">

            <div className="flex w-full justify-between">

                <div className="flex-col flex h-full justify-between">

                    <div className="text-subtitle text-sm">
                        <span>{user?.name} {user?.surname}</span>
                    </div>

                </div>

                <ActionButton
                    text={currency}
                    click={() => { }}
                    fontWeight="font-semibold"
                    hasBackground={true}
                    backgroundColor='bg-gray'
                    color="text-subtitle"
                    fontSize="text-xl"
                    rounded={true}
                    width="w-12"
                    height="h-12"
                    hoverBackgroundColor="hover:bg-gray/90"
                />
            </div>

            <div className="flex w-full justify-between items-end ">

                <div>
                    <p className="text-3xl leading-7 text-text font-semibold">{currentBalance}</p>

                    {/* <p>
                        aaa
                    </p> */}
                </div>

                <div className="flex text-sm">
                    <div className="dark:text-greenpale text-green flex items-center">
                        <IncreaseIcon width="20px" height="20px" />
                        <span>{totalIncomes}</span>
                    </div>
                    <div className="dark:text-redpale text-red ml-2 flex items-center">
                        <DecreaseIcon width="20px" height="20px" />
                        <span>{totalExpenses}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
