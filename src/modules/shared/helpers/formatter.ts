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
        const cleanedString = stringNumber.replace(/,/g, "");
        return parseFloat(cleanedString);
    }

    return stringNumber === null ? 0 : stringNumber;
};
