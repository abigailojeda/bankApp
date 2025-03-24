import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { TRANSACTION_CHANGED_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { AccountContext } from '../../account/states/AccountContext';
import { TransferContext } from '../states/TransferContext';
import { toast } from 'react-toastify';
import { Toaster } from '../../shared/components/Toaster';
import { ToasterMessage } from '../../shared/types/Toaster.type';
import { TransferTypeColorMap, TransferTypeKey } from '../types/transfer.types';
import { formatAmountDisplayed } from '../../shared/helpers/formatter';

const RealtimeTransferNotifier: React.FC = () => {
  const { data, error } = useSubscription(TRANSACTION_CHANGED_SUBSCRIPTION);
  const { updateCurrentBalance } = useContext(AccountContext);
  const { refreshTransfers } = useContext(TransferContext);

  const updateState = async (newBalance: number) => {
    updateCurrentBalance(newBalance);
    await refreshTransfers();
  }

  const displayToaster = (message: ToasterMessage) => {
    toast(() => <Toaster message={message} />);
  };

  const getActionMessage = (changeType: string) => {
    switch (changeType) {
      case 'CREATED':
        return 'New transaction on your account';
      case 'UPDATED':
        return 'Transaction updated';
      case 'VOIDED':
        return 'Transaction deleted';
      case 'UNDONE':
        return 'Transaction undone';
      default:
        return 'Transaction changed';
    }
  };

  useEffect(() => {
    (async () => {
      if (data?.transactionChanged) {
        const { transaction, changeType } = data.transactionChanged;

        const toasterMessage: ToasterMessage = {
          title: getActionMessage(changeType),
          subtitle: `${transaction.description}`,
          content: `${transaction.type === 'withdrawal' ? '-' : ''}${transaction.type === 'deposit' ?  '+' : ''}${formatAmountDisplayed(transaction.amount, transaction.currency)}`,
        };

        if (changeType === 'VOIDED' || changeType === 'UPDATED') {
          toasterMessage.color = TransferTypeColorMap[changeType.toLowerCase() as TransferTypeKey];
        }
        else {
          toasterMessage.color = TransferTypeColorMap[transaction.type as TransferTypeKey];
        }
        updateState(transaction.updatedBalance);

        displayToaster(toasterMessage);
      }
    })();
  }, [data]);


  if (error) return <p>Subscription error: {error.message}</p>;

  return null;
};

export default RealtimeTransferNotifier;