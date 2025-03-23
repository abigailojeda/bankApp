import React, { useContext, useState } from 'react';
import { TransferContext } from '../states/TransferContext';
import TransferItem from './TransferItem';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';
import { ActionButton } from '../../shared/components/ActionButton';
import { TransferIcon } from '../../shared/components/icons/TransferIcon';
import useResponsiveItemCount from '../../shared/hooks/useResponsiveItemCount';
import { Link } from 'react-router-dom';
import { getVisibleTransfers } from '../utils/transferUtils';
import { TransferAddForm, transferFormFields } from '../types/transfer.types';
import { Modal } from '../../shared/components/Modal';
import { FormComponent } from '../../shared/components/forms/FormComponent';
import { formatStringNumber } from '../../shared/helpers/formatter';
import { AccountContext } from '../../account/states/AccountContext';

const TransfersSummary: React.FC = () => {
  const { transfers, loading, error, addTransfer } = useContext(TransferContext);
  const { currentAccount } = useContext(AccountContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemCount = useResponsiveItemCount(5, 3);

  const visibleTransfers = getVisibleTransfers(transfers, itemCount);

  const handleAddTransfer = async (values: Record<string, string | number>) => {
    if (!currentAccount) return;
    
    const formattedValues: TransferAddForm = {
      ...values,
      amount: formatStringNumber(values.amount),
      accountId: currentAccount.id,
      type: String(values.type) || '',
      description: String(values.description) || '',
    };

    try {
      await addTransfer(formattedValues);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding transfer:', err);
    }
  };

  const transferInitialValues = {
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  };

  const validateTransaction = (values: Record<string, string | number>) => {
    const errors: { [key: string]: string } = {};
  
    const amountNum = Number(values.amount);
    if (!values.amount || isNaN(amountNum) || amountNum <= 0) {
      errors.amount = "Invalid amount.";
    }
  
    if (values.type === "withdrawal" && currentAccount) {
      if (amountNum > formatStringNumber(currentAccount.current_balance)) {
        errors.amount = "Insufficient funds.";
      }
    }
  
    if (!values.description) {
      errors.description = "Description is required.";
    }
  
    return errors;
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
        <Modal
          title='Add Transfer'
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ChildComponent={(props) => <FormComponent {...props} fields={transferFormFields} initialValues={transferInitialValues}
            onSubmit={handleAddTransfer} onClose={() => setIsModalOpen(false)} validate={validateTransaction}/>}
        />
      )}
    </>
  );
};

export default TransfersSummary;
