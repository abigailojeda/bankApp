import { ChartIllustration } from "./ChartIllustration"

export const SavingsChart = () => {
    return (
        <div className="card-style flex flex-col mb-4 justify-start items-center ">
            <div className="flex justify-between items-center w-full">

                <h2 className="text-sm text-text text-left w-full  font-semibold">Savings</h2>
                <span className="bg-bg text-subtitle text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    Under construction
                </span>
            </div>

            <ChartIllustration />

            <p className="text-subtitle my-4">We are working to improve your experience</p>
        </div>
    )
}
