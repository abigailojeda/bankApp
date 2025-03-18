import React, { useContext, useState } from 'react';
import { TransferContext } from '../states/TransferContext';
import TransferItem from './TransferItem';
import AddTransferModal from './AddTransferModal';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';

const TransferList: React.FC = () => {
  const { transfers, loading, error, addTransfer } = useContext(TransferContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransfer = async (transferData: {
    amount: number;
    description: string;
    type: string;
    currency: string;
    accountId: string;
    date?: string;
  }) => {
    try {
      await addTransfer(transferData);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding transfer:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <RealtimeTransferNotifier />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add transfer
      </button>
      {transfers.map((transfer) => (
        <TransferItem key={transfer.id} transfer={transfer} />
      ))}
      {isModalOpen && (
        <AddTransferModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTransfer}
        />
      )}
    </div>
  );
};

export default TransferList;
