import { Transfer } from '../utils/transfer.types';

interface TransferItemProps {
  transfer: Transfer;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  return (
    <div className="border p-2 mb-2">
      <p>ID: {transfer.id}</p>
      <p>Quantity: {transfer.amount} {transfer.currency}</p>
      <p>Date: {transfer.date}</p>
      <p>Category: {transfer.type}</p>
      <p>Description: {transfer.description}</p>
    </div>
  );
};

export default TransferItem;
