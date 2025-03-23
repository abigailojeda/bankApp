import { ModalProps } from "../types/Modal.types";

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    ChildComponent
}) => {


    return (
        <div className={`
            ${isOpen ? "block" : "hidden"}
            fixed w-full inset-0 flex items-center justify-center z-50
          `}>
            <div onClick={onClose} className={`fixed w-full inset-0 flex items-center justify-center bg-darkbg/60  `}>
            </div>
            <div className=" card-style w-full max-w-md z-60">
                {<ChildComponent />}
            </div>
        </div>
    )
}
