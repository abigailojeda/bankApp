import { ActionButton } from './ActionButton'
import { TransferIcon } from './icons/TransferIcon'

export const Footer = () => {
    return (
        <div className='w-full bg-white/30 backdrop-blur-md bottom-0 left-0 z-50 fixed flex sm:hidden justify-center items-center py-4'>
            <ActionButton
                text="Transfer"
                color="#959EB1"
                fontSize="14px"
                fontWeight="600"
                hoverColor="#B1BBD0"
                Icon={() => <TransferIcon width="21" height="21" />}
                click={() => console.log('test')} />
        </div>
    )
}
