import { AccountSummary } from "../../account/components/AccountSummary";
import TransferList from "../../transfers/components/TransferList";

export const DashboardPage = () => {
    return (
        <div className="container sm:px-8 px-6 w-full sm:pt-24 mx-auto flex sm:flex-row flex-col">
            <div className="sm:h-[calc(100vh-120px)] h-[350px] grid grid-cols-1 gap-4">
                {/* balance */}
                <AccountSummary />

                {/*transfers */}
                <TransferList />
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
