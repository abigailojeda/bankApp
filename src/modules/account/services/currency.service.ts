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
    console.log(response);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: CurrencyRatesResponse = await response.json();
    const rates = data[base.toLowerCase()] as { [currency: string]: number };
    return rates;
  } catch (error) {
    console.error("Error fetching all exchange rates:", error);
    throw error;
  }
};

export const getExchangeRate = async (
  base: string,
  target: string
): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/${base.toLowerCase()}.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: CurrencyRatesResponse = await response.json();
    const rates = data[base.toLowerCase()] as { [key: string]: number };
    if (rates && rates[target.toLowerCase()]) {
      return rates[target.toLowerCase()];
    } else {
      throw new Error(`Exchange rate for ${target} not found.`);
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};

export const convertCurrency = async (
  amount: number,
  base: string,
  target: string
): Promise<number> => {
  const rate = await getExchangeRate(base, target);
  return amount * rate;
};
