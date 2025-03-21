import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { TRANSACTION_CHANGED_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { AccountContext } from '../../account/states/AccountContext';
import { TransferContext } from '../states/TransferContext';
import { toast } from 'react-toastify';
import { Toaster } from '../../shared/components/Toaster';
import { ToasterMessage } from '../../shared/types/Toaster.type';
import { TransferTypeColorMap, TransferTypeKey } from '../types/transfer.types';

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


  useEffect(() => {
    (async () => {
      if (data?.transactionChanged) {
        const { transaction } = data.transactionChanged;

        const toasterMessage: ToasterMessage = {
          title: 'New transaction on your account',
          subtitle: `${transaction.description}`,
          content: `${transaction.type === 'withdrawal' ? '-' : ''}${transaction.amount} ${transaction.currency}`
        };

        toasterMessage.color = TransferTypeColorMap[transaction.type as TransferTypeKey];
        updateState(transaction.updatedBalance);

        displayToaster(toasterMessage);
      }
    })();
  }, [data]);


  if (error) return <p>Subscription error: {error.message}</p>;

  return null;
};

export default RealtimeTransferNotifier;