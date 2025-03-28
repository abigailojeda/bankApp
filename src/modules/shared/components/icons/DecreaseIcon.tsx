import { IconProps } from "../../types/Icon.types"

export const DecreaseIcon:React.FC<IconProps> = ({
    width = "24",
    height = "24",
    viewBox = "0 0 24 24"
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="currentColor">
            <path d="m14 9.586-4 4-6.293-6.293-1.414 1.414L10 16.414l4-4 4.293 4.293L16 19h6v-6l-2.293 2.293z"></path>
        </svg>
    )
}
