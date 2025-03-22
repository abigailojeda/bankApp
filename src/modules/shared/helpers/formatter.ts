export const formatDate = (date: number): string => {
  return new Date(date).toLocaleDateString();
};

export const formatAmount = (amount: number, currency = "EUR"): string => {
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
