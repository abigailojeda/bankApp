import React, { useContext, useState } from 'react';
import { TransferContext } from '../states/TransferContext';
import TransferItem from './TransferItem';
import AddTransferModal from './AddTransferModal';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';
import { ActionButton } from '../../shared/components/ActionButton';
import { TransferIcon } from '../../shared/components/icons/TransferIcon';
import useResponsiveItemCount from '../../shared/hooks/useResponsiveItemCount';

const TransferList: React.FC = () => {
  const { transfers, loading, error, addTransfer } = useContext(TransferContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemCount = useResponsiveItemCount(6, 5);
  const visibleTransfers = transfers
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
    .slice(0, itemCount);

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
    <div className='h-full card-style '>
      <RealtimeTransferNotifier />
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-sm text-text font-semibold">Recent transactions</h2>
        <ActionButton
          color="text-subtitle"
          fontSize="text-sm"
          fontWeight="font-semibold"
          hasBackground={true}
          backgroundColor='bg-gray'
          rounded={true}
          Icon={() => <TransferIcon width="22" height="22" />}
          hoverColor="hover:text-subtitle/80"
          click={() => setIsModalOpen(true)}
        />

      </div>

      <div className='h-[calc(90%)] overflow-y-auto '>

        {visibleTransfers.map((transfer) => (
          <TransferItem key={transfer.id} transfer={transfer} />
        ))}

      </div>
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
