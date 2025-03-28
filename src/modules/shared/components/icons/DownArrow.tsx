import { IconProps } from "../../types/Icon.types"

export const DownArrowIcon: React.FC<IconProps> = ({
    width = "24",
    height = "24",
    viewBox = "0 0 24 24"
}) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="currentColor">
                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
            </svg>
        </>
    )
}
