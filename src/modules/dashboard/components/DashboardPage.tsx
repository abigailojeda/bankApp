import TransferList from "../../transfers/components/TransferList";

export const DashboardPage = () => {
    return (
        <div className="container sm:px-8 px-6  sm:pt-24 mx-auto flex sm:flex-row flex-col">

            <h1>Hola Mundo</h1>

            <div className="sm:max-w-[392px] w-full sm:mr-8 sm:mb-0 mb-8 bg-primary rounded-lg shadow-md p-6 sm:h-[calc(100vh-120px)] h-[262px]">
                {/* balance */}

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
