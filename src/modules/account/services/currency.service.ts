import { filterValidCurrencyCodes } from "../../shared/helpers/formatter";

const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

export interface CurrencyRatesResponse {
  date: string;
  [key: string]: string | { [key: string]: number };
}

export const getAllExchangeRates = async (
  base: string = "eur"
): Promise<{ [currency: string]: number }> => {
  try {
    const response = await fetch(`${BASE_URL}/${base.toLowerCase()}.min.json`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data: CurrencyRatesResponse = await response.json();
    const rates = data[base.toLowerCase()] as { [currency: string]: number };
    
    filterValidCurrencyCodes(rates);

    return rates;
  } catch (error) {
    console.error("Error fetching all exchange rates:", error);
    throw error;
  }
};

export const updateCurrencyService = async (
  accountId: number,
  newBalance: number,
  newCurrency: string
): Promise<void> => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation UpdateCurrency($accountId: ID!, $currency: String!, $balance: Float!) {
        updateCurrency(id: $accountId, currency: $currency, current_balance: $balance) {
          id
          currency
          current_balance
        }
      }`,
      variables: { accountId, currency: newCurrency, balance: newBalance },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
}