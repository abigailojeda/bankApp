// src/modules/transfers/services/transfer.service.ts
import { TransferResponse } from '../types/transfer.types';

const GET_TRANSFERS_QUERY = `
  query {
    transactions {
      id
      amount
      date
      type
      description
      currency
      account_id
      current_balance
    }
  }
`;

const ADD_TRANSFER_MUTATION = `
  mutation CreateTransfer(
    $accountId: ID!,
    $amount: Float!,
    $date: String,
    $type: String,
    $description: String
  ) {
    createTransaction(
      accountId: $accountId,
      amount: $amount,
      date: $date,
      type: $type,
      description: $description
    ) {
      id
      account_id
      amount
      date
      type
      description
      currency
      updatedBalance
      current_balance
    }
  }
`;

export async function getTransfers(): Promise<TransferResponse[]> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_TRANSFERS_QUERY }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.transactions;
}

export async function addTransferService(transferData: {
  accountId: number;
  amount: number;
  date?: string;
  type: string;
  description: string;
}): Promise<TransferResponse> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: ADD_TRANSFER_MUTATION,
      variables: transferData,
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.createTransaction;
}
