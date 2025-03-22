import { AccountSummary } from "../../account/components/AccountSummary";
import TransfersSummary from "../../transfers/components/TransfersSummary";

export const DashboardPage = () => {
    return (
        <div className="page-container">
            <div className="flex flex-col gap-4" >
                {/* balance */}
                <AccountSummary />

                {/*transfers */}
                <TransfersSummary />
            </div>

            <div>

            </div>
            {/* cards */}

            <div>
                {/* charts */}

            </div>



        </div>
    );
}
