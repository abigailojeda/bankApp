import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { CURRENCY_CHANGED_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { AccountContext } from '../states/AccountContext';
import { toast } from 'react-toastify';
import { Toaster } from '../../shared/components/Toaster';
import { ToasterMessage } from '../../shared/types/Toaster.type';

const RealtimeCurrencyNotifier: React.FC = () => {
  const { data, error } = useSubscription(CURRENCY_CHANGED_SUBSCRIPTION);
  const { updateCurrencyValue, refreshAccounts } = useContext(AccountContext);

  const updateState = async (newCurrency: string) => {
    updateCurrencyValue(newCurrency);
    await refreshAccounts();
  }

  const displayToaster = (message: ToasterMessage) => {

    toast(() => <Toaster message={message} />);
  };


  useEffect(() => {
    (async () => {
      if (data?.currencyChanged) {
        const { currency } = data.currencyChanged;

        const toasterMessage: ToasterMessage = {
          title: 'Currency has been updated to',
          caption: currency,
        };

        toasterMessage.color = 'text-blue';
        updateState(currency);

        displayToaster(toasterMessage);
      }
    })();
  }, [data]);


  if (error) return <p>Subscription error: {error.message}</p>;

  return null;
};

export default RealtimeCurrencyNotifier;