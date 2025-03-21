export type TransferTypeKey = "reversal" | "deposit" | "withdrawal";

export const TransferTypeColorMap: Record<TransferTypeKey, string> = {
  reversal: "text-orange",
  deposit: "text-green",
  withdrawal: "text-redtoaster",
};

export interface Transfer {
  id: string;
  account_id: string;
  amount: number;
  date: string;
  type: string;
  description: string;
  currency: string;
  current_balance: number;
}
