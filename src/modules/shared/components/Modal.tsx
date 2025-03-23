import { ModalProps } from "../types/Modal.types";

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    onClose,
    ChildComponent
}) => {


    return (
        <div className={`
            ${isOpen ? "block" : "hidden"}
            fixed w-full inset-0 flex items-center justify-center z-50
          `}>

            <div onClick={onClose} className={`fixed w-full inset-0 flex items-center justify-center dark:bg-darkbg/80 bg-darkbg/60 `}>
            </div>

            <div className=" card-style p-8 w-full sm:max-w-md max-w-[95vw] z-60">

                {
                    title && (
                        <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-bg border-gray">
                            <h2 className="text-sm text-subtitle font-semibold">{title}</h2>
                        </div>
                    )
                }

                {<ChildComponent />}
            </div>
        </div>
    )
}
