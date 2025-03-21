import { Account } from "../types/account.type";

const GET_ACCOUNTS_QUERY = `
    query {
        accounts {
        id
        iban
        current_balance
        currency
        }
    }
    `;

export async function getAccounts(): Promise<Account[]> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_ACCOUNTS_QUERY }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.accounts;
}
