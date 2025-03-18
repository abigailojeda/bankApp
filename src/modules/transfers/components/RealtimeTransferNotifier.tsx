import React, { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { TRANSACTION_ADDED_SUBSCRIPTION } from '../../../graphql/subscriptions';

const RealtimeTransferNotifier: React.FC = () => {
  const { data, error } = useSubscription(TRANSACTION_ADDED_SUBSCRIPTION);

  useEffect(() => {
    if (data && data.transactionAdded) {
      console.log('Nueva transferencia recibida:', data.transactionAdded);
    }
  }, [data]);

  if (error) return <p>Subscription error: {error.message}</p>;

  return null; 
};

export default RealtimeTransferNotifier;