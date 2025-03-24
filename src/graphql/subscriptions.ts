import { gql } from '@apollo/client';

export const TRANSACTION_CHANGED_SUBSCRIPTION = gql`
  subscription {
    transactionChanged {
      changeType
      transaction {
        id
        account_id
        amount
        date
        type
        description
        currency
        updatedBalance
      }
    }
  }
`;

export const CURRENCY_CHANGED_SUBSCRIPTION = gql`
  subscription {
    currencyChanged {
      id
      currency
    }
  }
`;

export const CARD_CHANGED_SUBSCRIPTION = gql`
  subscription {
    cardChanged {
      changeType
      card {
        id
        account_id
        card_number
      }
    }
  }
`;