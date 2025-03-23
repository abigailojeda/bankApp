export interface ModalProps {
  isOpen: boolean;
  ChildComponent: React.FC;
  onClose: () => void;
  title?: string;
}

export interface ConfirmationComponentProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}