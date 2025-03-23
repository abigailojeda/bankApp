import React, { useContext, useState } from 'react';
import { TransferContext } from '../states/TransferContext';
import TransferItem from './TransferItem';
import AddTransferModal from './AddTransferModal';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';
import { ActionButton } from '../../shared/components/ActionButton';
import { TransferIcon } from '../../shared/components/icons/TransferIcon';
import useResponsiveItemCount from '../../shared/hooks/useResponsiveItemCount';
import { Link } from 'react-router-dom';
import { getVisibleTransfers } from '../utils/transferUtils';
import { TransferAddForm } from '../types/transfer.types';

const TransfersSummary: React.FC = () => {
  const { transfers, loading, error, addTransfer } = useContext(TransferContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemCount = useResponsiveItemCount(5, 3);

  const visibleTransfers = getVisibleTransfers(transfers, itemCount);

  const handleAddTransfer = async (transferData:TransferAddForm) => {
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
    <>
      <div className=' card-style '>
        <RealtimeTransferNotifier />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm text-text font-semibold">Recent transactions</h2>
          <ActionButton
            color="text-subtitle"
            fontSize="text-sm"
            fontWeight="font-semibold"
            hasBackground={true}
            backgroundColor='bg-gray'
            rounded={true}
            Icon={() => <TransferIcon width="22" height="22" />}
            hoverBackgroundColor="hover:bg-gray/90"
            width='w-8'
            height='h-8'
            click={() => setIsModalOpen(true)}
          />

        </div>

        {visibleTransfers.map((transfer) => (
          <TransferItem key={transfer.id} transfer={transfer} />
        ))}

        <div className='border-t dark:border-bg border-gray mt-4 '>
          <Link to="/transactions">
            <p className='text-center h-full text-sm cursor-pointer py-2 mt-2 hover:bg-bg text-text w-full'>See more</p>
          </Link>

        </div>

      </div>


      {isModalOpen && (
        <AddTransferModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTransfer}
        />
      )}
    </>
  );
};

export default TransfersSummary;
