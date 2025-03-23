export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ChildComponent: React.FC;
}
