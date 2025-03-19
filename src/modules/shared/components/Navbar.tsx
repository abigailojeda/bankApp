import { NavbarProps } from "../types/Navbar.types"
import { ActionButton } from "./ActionButton"
import { NotificationIcon } from "./icons/NotificationIcon"
import { TransferIcon } from "./icons/TransferIcon"
import { UserIcon } from "./icons/UserIcon"

export const Navbar: React.FC<NavbarProps> = ({
    backgroundColor = "rgba(255, 255, 255, 0.8)",
    isFixed = true
}) => {
    return (
        <div className={`w-full sm:fixed sm:bg-white/50 top-0 md:px-8 px-4 backdrop-blur-md left-0 z-50`}>
            <div className="container mx-auto flex items-center justify-between py-4">
                <h1 className="text-sm font-extrabold text-[#C66BD6]">MAGICBANK</h1>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <ActionButton 
                            text="Transfer"
                            color="#959EB1"
                            fontSize="14px"
                            fontWeight="600"
                            hideTextOnMobile={true}
                            hoverColor="#B1BBD0"
                            Icon={() => <TransferIcon  width="21" height="21"/>}
                            click={() => console.log('test')}/>
                        </li>
                        <li>
                            <ActionButton 
                            text="Notifications"
                            color="#959EB1"
                            fontSize="14px"
                            fontWeight="600"
                            hideTextOnMobile={true}
                            hoverColor="#B1BBD0"
                            Icon={() => <NotificationIcon  width="19" height="19"/>}
                            click={() => console.log('test')}/>
                        </li>
                        <li>
                            <ActionButton 
                            text="Username"
                            color="#959EB1"
                            fontSize="14px"
                            fontWeight="600"
                            hideTextOnMobile={true}
                            hoverColor="#B1BBD0"
                            Icon={() => <UserIcon  width="19" height="19"/>}
                            click={() => console.log('test')}/>
                        </li>
                    </ul>
                </nav>
            </div>


        </div>
    )
}
