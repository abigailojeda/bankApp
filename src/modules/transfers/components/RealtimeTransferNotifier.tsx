import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { TRANSACTION_CHANGED_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { AccountContext } from '../../account/states/AccountContext';
import { TransferContext } from '../states/TransferContext';
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49';

const RealtimeTransferNotifier: React.FC = () => {
  const { data, error } = useSubscription(TRANSACTION_CHANGED_SUBSCRIPTION);

  const { updateCurrentBalance } = useContext(AccountContext);

  const { refreshTransfers } = useContext(TransferContext);

  const updateState = async (newBalance: number) => {
    updateCurrentBalance(newBalance);
    await refreshTransfers();
  }


  useEffect(() => {
    (async () => {
      if (data?.transactionChanged) {
        const { changeType, transaction } = data.transactionChanged;
        switch (changeType) {
          case 'CREATED':
            console.log('New transaction added:', transaction);
            break;
          case 'UPDATED':
            console.log('Transaction updated:', transaction);
            break;
          default:
            console.log('Unknown change', data.transactionChanged);
        }
        updateState(transaction.updatedBalance);
      }



    })();
  }, [data]);


  if (error) return <p>Subscription error: {error.message}</p>;

  return null;
};

export default RealtimeTransferNotifier;