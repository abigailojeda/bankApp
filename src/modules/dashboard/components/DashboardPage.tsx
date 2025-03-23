import { AccountSummary } from "../../account/components/AccountSummary";
import { ExpensesChart } from "../../analytics/components/ExpensesChart";
import { SavingsChart } from "../../analytics/components/SavingsChart";
import TransfersSummary from "../../transfers/components/TransfersSummary";

export const DashboardPage = () => {
    return (
        <div className="page-container flex-wrap">
            <div className="flex flex-col  gap-4" >
                {/* balance */}
                <AccountSummary />

                {/*transfers */}
                <TransfersSummary />
            </div>


            <div>
                {/* charts */}

                <SavingsChart/>
                <ExpensesChart  />

            </div>


            {/* cards */}
            <div>

            </div>

        </div>
    );
}
