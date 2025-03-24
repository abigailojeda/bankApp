import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { CARD_CHANGED_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { toast } from 'react-toastify';
import { Toaster } from '../../shared/components/Toaster';
import { ToasterMessage } from '../../shared/types/Toaster.type';
import { formatCardNumber } from '../../shared/helpers/formatter';
import { CardContext } from '../states/CardContext/CardContext';
import { CardTypeColorMap, CardTypeKey } from '../types/card.type';

const RealtimeCardNotifier: React.FC = () => {
  const { data, error } = useSubscription(CARD_CHANGED_SUBSCRIPTION);
  const { refreshCards } = useContext(CardContext);

  const updateState = async () => {
    await refreshCards();
  }

  const displayToaster = (message: ToasterMessage) => {
    toast(() => <Toaster message={message} />);
  };

  const getActionMessage = (changeType: string) => {
    switch (changeType) {
      case 'CREATED':
        return 'New card on your account';
      case 'UPDATED':
        return 'Card updated';
      case 'DELETED':
        return 'Card undone';
      default:
        return 'Card changed';
    }
  };

  useEffect(() => {
    (async () => {
      if (data?.cardChanged) {
        const { card, changeType } = data.cardChanged;

        const toasterMessage: ToasterMessage = {
          title: getActionMessage(changeType),
          subtitle: `${formatCardNumber(card.card_number)}`,
        };

        toasterMessage.color = CardTypeColorMap[changeType.toLowerCase() as CardTypeKey];
        
        updateState();

        displayToaster(toasterMessage);
      }
    })();
  }, [data]);


  if (error) return <p>Subscription error: {error.message}</p>;

  return null;
};

export default RealtimeCardNotifier;