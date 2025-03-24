export interface ModalProps {
  isOpen: boolean;
  ChildComponent: React.FC;
  onClose: () => void;
  title?: string;
}

export interface ConfirmationComponentProps {
  message: string;
  error?: string;
  onConfirm: () => void;
  onClose: () => void;
}