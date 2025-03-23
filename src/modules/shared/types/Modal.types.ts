export interface ModalProps {
  isOpen: boolean;
  ChildComponent: React.FC;
  onClose: () => void;
  title?: string;
}
