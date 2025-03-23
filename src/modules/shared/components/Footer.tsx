import { ActionButton } from './ActionButton'
import { TransferIcon } from './icons/TransferIcon'

export const Footer = () => {
    return (
        <div className='w-full bg-primary/60 backdrop-blur-md bottom-0 left-0 z-30 fixed flex sm:hidden justify-center items-center py-4'>
            <ActionButton
                text="Transfer"
                color="text-subtitle"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hoverColor="hover:text-subtitle/80"
                Icon={() => <TransferIcon width="21" height="21" />}
                click={() => console.log('test')} />
        </div>
    )
}
