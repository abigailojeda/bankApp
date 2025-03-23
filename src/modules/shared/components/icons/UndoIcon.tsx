import { IconProps } from "../../types/Icon.types"


export const UndoIcon: React.FC<IconProps> = ({
    width = "24",
    height = "24",
    viewBox = "0 0 24 24"
}) => {


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="currentColor">
                <path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path>
            </svg>
        </>
    )
}