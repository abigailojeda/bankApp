
export const DashboardLoading = () => {
    return (
        <div className="page-container flex-wrap gap-6">

            <div className="flex flex-col animate-pulse gap-4" >
                {/* balance */}
                <div className="h-[276px] sm:w-[392px] w-full card-style"></div>

                {/*transfers */}
                <div className="h-[320px] sm:w-[392px] w-full card-style"></div>
            </div>


            <div className=" animate-pulse ">
                {/* charts */}

                <div className="h-[285px] sm:w-[392px] w-full card-style"></div>
                <div className="h-[285px] sm:w-[392px] mt-4 w-full card-style"></div>

            </div>


            {/* cards */}
            <div className=" animate-pulse ">
                <div className="card-style h-[276px] sm:w-[392px] w-full "></div>
                <div className="h-[276px] sm:w-[392px] mt-4 w-full card-style"></div>
            </div>


        </div>
    )
}
