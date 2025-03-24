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
import { CancelIcon } from '../../shared/components/icons/CancelIcon';
import { validateTransaction } from '../utils/validationUtils';
import { ConfirmationComponent } from '../../shared/components/ConfirmationComponent';

interface TransferItemProps {
  transfer: Transfer;
  isLast: boolean;
  isSummary?: boolean;
}

interface ConfirmModal {
  isOpen: boolean;
  action: 'delete' | 'undo';
  error?: string;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer, isLast, isSummary }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({ isOpen: false, action: 'delete' });
  const { currentAccount, currentBalance } = useContext(AccountContext);
  const { updateTransfer, addTransfer, deleteTransfer, undoTransfer, validateTransferData } = useContext(TransferContext);
  const shouldShowUndoButton = isLast && !(transfer.type === 'reversal');

  const handleDelete = async () => {
    try {
      await deleteTransfer(transfer.id);
      handleCloseConfirmModal();
    } catch (err) {
      console.error("Error deleting transfer:", err);
    } finally {
      setIsHovered(false);
    }
  }

  const handleUndo = async () => {
    try {
      await undoTransfer(transfer.id);
      handleCloseConfirmModal();
    } catch (err) {
      console.error("Error undoing transfer:", err);
    } finally {
      setIsHovered(false);
    }
  }

  const handleConfirmDelete = () => {
    const errors = validateTransferData({
      amount: String(formatStringNumber(transfer.amount)),
      type: transfer.type,
      description: transfer.description
    }, 'delete');
    if (Object.keys(errors).length > 0) {
      setConfirmModal({ isOpen: true, action: 'delete', error: Object.values(errors)[0] });
      return;
    }
    setConfirmModal({ isOpen: true, action: 'delete' });
  };

  const handleConfirmUndo = () => {
    const errors = validateTransferData({
      amount: String(formatStringNumber(transfer.amount)),
      type: transfer.type,
      description: transfer.description
    }, 'undo');
    if (Object.keys(errors).length > 0) {
      setConfirmModal({ isOpen: true, action: 'undo', error: Object.values(errors)[0] });
      return;
    }
    setConfirmModal({ isOpen: true, action: 'undo' });
  };

  const handleConfirm = () => {
    if (confirmModal.action === 'delete') {
      handleDelete();
    } else {
      handleUndo();
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal({ isOpen: false, action: 'delete' });
  };

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
    } finally {
      setIsHovered(false);
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
    } finally {
      setIsHovered(false);
    }
  };

  const onClose = (setOnClose: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOnClose(false);
    setIsHovered(false);
  }

  const editInitialValues = {
    amount: formatStringNumber(transfer.amount) || "",
    type: transfer.type || "",
    description: transfer.description || "",
    date: (transfer.date && !isNaN(new Date(transfer.date).getTime()))
      ? new Date(transfer.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };

  const copyInitialValues = {
    amount: formatStringNumber(transfer.amount) || "",
    type: transfer.type || "",
    description: transfer.description || "",
    date: new Date().toISOString().split("T")[0],
  };

  return (
    <div className={`sm:border-none border  rounded-lg p-4 mb-4 sm:p-0 ${!isSummary ? 'border-subtitle/60 dark:border-secondary' : 'border-gray dark:border-bg'}`}>
      <div className={`w-full relative flex justify-between  ${isSummary ? ' sm:p-0 ' : 'sm:p-2 rounded-md'}`}>

        <div className="flex items-center">

          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${transfer.type === 'deposit'
            ? 'bg-greenpale text-green'
            : transfer.type === 'reversal'
              ? 'bg-orange/40 text-orange'
              : 'bg-redpale text-red'
            }`}

          >
            {transfer.type === "deposit" ? (
              <UpArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            ) : transfer.type === "reversal" ? (
              <CancelIcon width="16" height="16" viewBox="0 0 24 24" />
            ) : (
              <DownArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            )}

          </div>

          <div className={`max-w-[150px] ${transfer.type === 'reversal' ? 'opacity-30' : ''}`}>
            <p className='text-sm text-text  truncate  font-semibold ml-2'>
              {transfer.description}
            </p>
            <p className='text-xs text-subtitle ml-2'>
              {transfer.date}
            </p>
          </div>
        </div>

        <div>
          {
            transfer.type === 'reversal' && (
              <span className='bg-orange/20 text-orange px-1.5 py-0.5 rounded-full text-xs'>Canceled</span>
            )
          }
          <p className={`text-sm text-text font-semibold text-right ${transfer.type === 'reversal' ? 'line-through opacity-30' : ''}`}>
            {transfer.type === 'deposit' && '+'}
            {transfer.type === 'withdrawal' && '-'}
            {transfer.amount}
          </p>
          <p className='text-xs text-subtitle text-right'>
            {transfer.current_balance}
          </p>

        </div>

        {/* actions desktop */}
        {
          transfer.type !== 'reversal' && (
            <div className='absolute sm:flex hidden gap-x-4 justify-center items-center left-0 top-0 h-full w-full flex items-center cursor-pointer'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {
                isHovered && (

                  <div className={`absolute flex gap-x-4 justify-center items-center left-0 top-0 h-full w-full flex items-center 
                  ${!isSummary ? 'bg-primary/60' : 'bg-primary/90'}`}>
                    <TransferItemActions
                      setShowEditModal={setShowEditModal}
                      setShowCopyModal={setShowCopyModal}
                      deleteTransfer={handleConfirmDelete}
                      undoTransfer={handleConfirmUndo}
                      transfer={{
                        amount: String(formatStringNumber(transfer.amount)),
                        type: transfer.type,
                        description: transfer.description
                      }}
                      shouldShowUndoButton={shouldShowUndoButton}
                    />
                  </div>
                )
              }

            </div>
          )
        }


      </div>

      {/*actions mobile */}

      {
        transfer.type !== 'reversal' && (
          <div className={`flex sm:hidden items-center w-full gap-x-4 mt-4 pt-2  justify-center border-t  
          ${!isSummary ? 'border-subtitle/60 dark:border-secondary' : 'border-gray dark:border-bg'}`}>

            <TransferItemActions
              setShowEditModal={setShowEditModal}
              setShowCopyModal={setShowCopyModal}
              deleteTransfer={handleConfirmDelete}
              undoTransfer={handleConfirmUndo}
              transfer={{
                amount: String(formatStringNumber(transfer.amount)),
                type: transfer.type,
                description: transfer.description
              }}
              shouldShowUndoButton={shouldShowUndoButton}
            />
          </div>
        )
      }

      {/* EDIT Modal */}
      {showEditModal && (
        <Modal
          title="Edit Transfer"
          isOpen={showEditModal}
          onClose={() => onClose(setShowEditModal)}
          ChildComponent={(props) => (
            <FormComponent
              {...props}
              fields={transferFormFields}
              initialValues={editInitialValues}
              onSubmit={handleEditSubmit}
              onClose={() => onClose(setShowEditModal)}
              validate={(values) => validateTransaction(values, currentBalance, currentAccount)}
            />
          )}
        />
      )}

      {/* COPY Modal */}
      {showCopyModal && (
        <Modal
          title="Copy Transfer"
          isOpen={showCopyModal}
          onClose={() => onClose(setShowCopyModal)}
          ChildComponent={(props) => (
            <FormComponent
              {...props}
              fields={transferFormFields}
              initialValues={copyInitialValues}
              onSubmit={handleCopySubmit}
              onClose={() => onClose(setShowCopyModal)}
              validate={(values) => validateTransaction(values, currentBalance, currentAccount)}
            />
          )}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal.isOpen && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.action === "delete" ? "Confirm Delete" : "Confirm Undo"}
          onClose={() => onClose(handleCloseConfirmModal)}
          ChildComponent={() => (
            <ConfirmationComponent
              message={
                confirmModal.action === "delete"
                  ? "Are you sure you want to delete this transfer?"
                  : "Are you sure you want to undo this transfer?"
              }
              error={confirmModal.error}
              onConfirm={handleConfirm}
              onClose={() => onClose(handleCloseConfirmModal)}
            />
          )}
        />
      )}
    </div>
  );
};

export default TransferItem;