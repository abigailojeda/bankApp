import { IconProps } from "../../types/Icon.types"


export const EditIcon: React.FC<IconProps> = ({
    width = "24",
    height = "24",
    viewBox = "0 0 24 24"
}) => {


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="currentColor">
                <path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path>
            </svg>
        </>
    )
}