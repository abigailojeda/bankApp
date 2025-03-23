import { useContext } from "react"
import { AuthContext } from "../../auth/states/AuthContext/AuthContext"
import { NavbarProps } from "../types/Navbar.types"
import { ActionButton } from "./ActionButton"
// import { NotificationIcon } from "./icons/NotificationIcon"
import { TransferIcon } from "./icons/TransferIcon"
import { UserIcon } from "./icons/UserIcon"
import { Switcher } from "./Switcher"

export const Navbar: React.FC<NavbarProps> = ({
    isDark,
    toggleDarkMode

}) => {

        const { user, loading: loadingAuth, error: errorAuth} = useContext(AuthContext);
    
    return (
        <div className={`w-full sm:fixed sm:bg-primary/60 backdrop-blur-md top-0 sm:px-8 px-6  left-0 z-50`}>
            <div className="container mx-auto flex items-center justify-between py-6">
                <h1 className="text-sm font-extrabold hover:text-subtitle text-purple">MAGICBANK</h1>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <ActionButton
                                text="Transfer"
                                color="text-subtitle"
                                fontSize="text-sm"
                                fontWeight="font-semibold"
                                hideTextOnMobile={true}
                                hoverColor="hover:text-subtitle/80"
                                Icon={() => <TransferIcon width="19" height="19" />}
                                click={() => console.log('test')} />
                        </li>
                        {/* <li>
                            <ActionButton
                                text="Notifications"
                                color="text-subtitle"
                                fontSize="text-sm"
                                fontWeight="font-semibold"
                                hideTextOnMobile={true}
                                hoverColor="hover:text-subtitle/80"
                                Icon={() => <NotificationIcon width="17" height="17" />}
                                click={() => console.log('test')} />
                        </li> */}
                        <li>
                            <ActionButton
                                text={user ? user.username : "Username"}
                                color="text-subtitle"
                                fontSize="text-sm"
                                fontWeight="font-semibold"
                                hideTextOnMobile={true}
                                hoverColor="hover:text-subtitle/80"
                                Icon={() => <UserIcon width="17" height="17" />}
                                click={() => console.log('test')} />
                        </li>
                        <Switcher isDark={isDark} onToggle={toggleDarkMode} />
                    </ul>
                </nav>
            </div>


        </div>
    )
}
