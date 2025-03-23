import { useContext, useState } from 'react';
import { DownArrowIcon } from '../../shared/components/icons/DownArrow';
import { UpArrowIcon } from '../../shared/components/icons/UpArrow';
import { Transfer, TransferAddForm, transferFormFields } from '../types/transfer.types';
import { TransferItemActions } from './TransferItemActions';
import { FormComponent } from '../../shared/components/forms/FormComponent';
import { formatStringNumber } from '../../shared/helpers/formatter';
import { AccountContext } from '../../account/states/AccountContext';
import { Modal } from '../../shared/components/Modal';
import { TransferContext } from '../states/TransferContext';

interface TransferItemProps {
  transfer: Transfer;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const { currentAccount } = useContext(AccountContext);
  const { updateTransfer, addTransfer, deleteTransfer, undoTransfer } = useContext(TransferContext);

  const validateTransaction = (values: Record<string, string | number>) => {
    const errors: { [key: string]: string } = {};

    const amountNum = Number(values.amount);
    if (!values.amount || isNaN(amountNum) || amountNum <= 0) {
      errors.amount = "Invalid amount.";
    }

    if (values.type === "withdrawal" && currentAccount) {
      const currentBalanceNum = Number(formatStringNumber(currentAccount.current_balance));
      if (amountNum > currentBalanceNum) {
        errors.amount = "Insufficient funds.";
      }
    }

    if (!values.description) {
      errors.description = "Description is required.";
    }
    return errors;
  };

  const handleDelete = async () => {
    try {
      await deleteTransfer(transfer.id);
    } catch (err) {
      console.error("Error deleting transfer:", err);
    }
  }

  const handleUndo = async () => {
    try {
      await undoTransfer(transfer.id);
    } catch (err) {
      console.error("Error undoing transfer:", err);
    }
  }

  const handleEditSubmit = async (values: Record<string, string | number>) => {
    const updatedValues: TransferAddForm & { id: string } = {
      ...values,
      id: transfer.id,
      amount: formatStringNumber(values.amount),
      accountId: transfer.account_id ? Number(transfer.account_id) : (currentAccount?.id || 0),
      description: String(values.description) || "",
      type: String(values.type) || "",
    };

    try {
      await updateTransfer(updatedValues);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating transfer:", err);
    }
  };

  const handleCopySubmit = async (values: Record<string, string | number>) => {
    const newValues: TransferAddForm = {
      ...values,
      amount: formatStringNumber(values.amount),
      accountId: currentAccount?.id || 0,
      description: String(values.description) || "",
      type: String(values.type) || "",
    };

    try {
      await addTransfer(newValues);
      setShowCopyModal(false);
    } catch (err) {
      console.error("Error copying transfer:", err);
    }
  };

  const editInitialValues = {
    amount: formatStringNumber(transfer.amount) || "",
    type: transfer.type || "",
    description: transfer.description || "",
    date: transfer.date || new Date().toISOString().split("T")[0],
  };

  const copyInitialValues = {
    amount: formatStringNumber(transfer.amount) || "",
    type: transfer.type || "",
    description: transfer.description || "",
    date: new Date().toISOString().split("T")[0],
  };

  return (
    <div className="sm:border-none border border-gray dark:border-bg rounded-lg p-4 mb-4 sm:p-0 ">
      <div className="w-full relative flex justify-between ">

        <div className="flex items-center">

          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${transfer.type === 'deposit' ? 'bg-greenpale text-green' : 'bg-redpale text-red'
            }`}
          >
            {transfer.type === 'deposit' ? (
              <UpArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            ) : (
              <DownArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            )}
          </div>

          <div className='max-w-[150px]'>
            <p className='text-sm text-text  truncate  font-semibold ml-2'>
              {transfer.description}
            </p>
            <p className='text-xs text-subtitle ml-2'>
              {transfer.date}
            </p>
          </div>
        </div>


        <div>
          <p className='text-sm text-text font-semibold text-right'>
            {transfer.type === 'deposit' ? '+' : '-'}
            {transfer.amount}
          </p>
          <p className='text-xs text-subtitle text-right'>
            {transfer.current_balance}
          </p>

        </div>

        {/* actions desktop */}
        <div className='absolute sm:flex hidden gap-x-4 justify-center items-center left-0 top-0 h-full w-full flex items-center cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            isHovered && (

              <div className='absolute flex gap-x-4 justify-center items-center left-0 top-0 h-full w-full flex items-center bg-primary/90'>
                <TransferItemActions setShowEditModal={setShowEditModal} setShowCopyModal={setShowCopyModal} deleteTransfer={handleDelete} undoTransfer={handleUndo} />

              </div>
            )
          }

        </div>

      </div>

      {/*actions mobile */}
      <div className="flex sm:hidden items-center w-full gap-x-4 mt-4 pt-2  justify-center border-t border-gray dark:border-bg">
        <TransferItemActions setShowEditModal={setShowEditModal} setShowCopyModal={setShowCopyModal} deleteTransfer={handleDelete} undoTransfer={handleUndo} />
      </div>

      {/* EDIT Modal */}
      {showEditModal && (
        <Modal
          title="Edit Transfer"
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          ChildComponent={(props) => (
            <FormComponent
              {...props}
              fields={transferFormFields}
              initialValues={editInitialValues}
              onSubmit={handleEditSubmit}
              onClose={() => setShowEditModal(false)}
              validate={validateTransaction}
            />
          )}
        />
      )}

      {/* COPY Modal */}
      {showCopyModal && (
        <Modal
          title="Copy Transfer"
          isOpen={showCopyModal}
          onClose={() => setShowCopyModal(false)}
          ChildComponent={(props) => (
            <FormComponent
              {...props}
              fields={transferFormFields}
              initialValues={copyInitialValues}
              onSubmit={handleCopySubmit}
              onClose={() => setShowCopyModal(false)}
              validate={validateTransaction}
            />
          )}
        />
      )}
    </div>
  );
};

export default TransferItem;
