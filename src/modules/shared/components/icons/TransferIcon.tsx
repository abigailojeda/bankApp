import { IconProps } from "../../types/Icon.types"

export const TransferIcon: React.FC<IconProps> = (
    {
        width = "24",
        height = "24",
        viewBox = "0 0 24 24"
    }
) => {


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="currentColor">
                <path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path>
            </svg>

        </>
    )
}
