import { useContext } from "react";
import { AccountSummary } from "../../account/components/AccountSummary";
import { ExpensesChart } from "../../analytics/components/ExpensesChart";
import { SavingsChart } from "../../analytics/components/SavingsChart";
import { CardsList } from "../../cards/components/CardsList";
import TransfersSummary from "../../transfers/components/TransfersSummary";
import { AccountContext } from "../../account/states/AccountContext";
import { AuthContext } from "../../auth/states/AuthContext/AuthContext";
import { TransferContext } from "../../transfers/states/TransferContext";
import { DashboardLoading } from "./DashboardLoading";
import { Footer } from "../../shared/components/Footer";

export const DashboardPage = () => {

    const { loading: loadingAccount } = useContext(AccountContext);
    const { loading: loadingAuth } = useContext(AuthContext);
    const { loading: loadingTranfers } = useContext(TransferContext);


    return (
        <>
            {
                loadingAccount || loadingAuth || loadingTranfers ? <DashboardLoading /> : <div className="page-container flex-wrap">
                    <div className="flex flex-col  gap-4" >
                        {/* balance */}
                        <AccountSummary />

                        {/*transfers */}
                        <TransfersSummary />
                    </div>


                    <div>
                        {/* charts */}

                        <SavingsChart />
                        <ExpensesChart />

                    </div>


                    {/* cards */}
                    <div>
                        <CardsList />
                    </div>

                </div>
            }
            <Footer />
        </>
    );
}
