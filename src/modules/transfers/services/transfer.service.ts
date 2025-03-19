// src/modules/transfers/services/transfer.service.ts
import { Transfer } from '../types/transfer.types';

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
    }
  }
`;

const ADD_TRANSFER_MUTATION = `
  mutation CreateTransfer(
    $accountId: ID!,
    $amount: Float!,
    $date: String,
    $type: String,
    $description: String,
    $currency: String
  ) {
    createTransaction(
      accountId: $accountId,
      amount: $amount,
      date: $date,
      type: $type,
      description: $description,
      currency: $currency
    ) {
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

export async function getTransfers(): Promise<Transfer[]> {
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
  accountId: string;
  amount: number;
  date?: string;
  type: string;
  description: string;
  currency: string;
}): Promise<Transfer> {
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
