export const formatDate = (date: number): string => {
  return new Date(date).toLocaleDateString();
};

export const formatAmountDisplayed = (
  amount: number,
  currency: string = "EUR"
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const { number, symbol } = formatter.formatToParts(amount).reduce<{
    number: string;
    symbol: string;
  }>(
    (acc, { type, value }) => {
      if (type === "currency") acc.symbol = value;
      else acc.number += value;
      return acc;
    },
    { number: "", symbol: "" }
  );

  return `${number} ${symbol}`;
};

export const formatNumberString = (
  inputValue: string,
  maxDecimal: number = 2
): string => {
  // Allow only digits and dot; remove commas if any were manually entered.
  let cleanedValue = inputValue.replace(/[^0-9.]/g, "");

  const parts = cleanedValue.split(".");

  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  cleanedValue = integerPart;

  if (parts.length > 1) {
    const decimalPart = parts[1].substring(0, maxDecimal);
    cleanedValue += "." + decimalPart;
  }

  return cleanedValue;
};

export const formatStringNumber = (stringNumber: string | number): number => {
  if (typeof stringNumber === "string") {
    const cleanedString = stringNumber.replace(/,/g, "").replace(/\s+/g, "");
    return parseFloat(cleanedString);
  }

  return stringNumber === null ? 0 : stringNumber;
};

export const filterValidCurrencyCodes = (rates: {
  [currency: string]: number;
}): void => {
  // Filter out any currency codes that do not conform to the ISO 4217 format
  // as Intl.NumberFormat only supports ISO 4217 currency codes.
  Object.keys(rates).forEach((currencyCode) => {
    if (!/^[A-Za-z]{3}$/.test(currencyCode)) {
      delete rates[currencyCode];
    }
  });
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replaceAll("-", " ").trim();
};

export const formatCardNumberString = (cardNumber: string): string => {
  const cleanedValue = cardNumber.replace(/[^0-9]/g, "");
  const parts = cleanedValue.match(/.{1,4}/g);
  return parts ? parts.join("-") : "";
};

export const parseDate = (dateString: string) => {
  if (!dateString) return null;
  if (dateString.includes("-")) {
    // ISO format "yyyy-mm-dd"
    const parts = dateString.split("-");
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed month
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  } else if (dateString.includes("/")) {
    // Format "dd/mm/aaaa"
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
};
