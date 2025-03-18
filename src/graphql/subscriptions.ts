import { gql } from '@apollo/client';

export const TRANSACTION_ADDED_SUBSCRIPTION = gql`
  subscription {
    transactionAdded {
      id
      account_id
      amount
      date
      type
      description
      currency
    }
  }
`;