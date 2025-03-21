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