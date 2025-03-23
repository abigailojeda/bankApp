export type TransferTypeKey = "reversal" | "deposit" | "withdrawal";

export const TransferTypeColorMap: Record<TransferTypeKey, string> = {
  reversal: "text-orange",
  deposit: "text-greentoaster",
  withdrawal: "text-redtoaster",
};

export interface Transfer {
  id: string;
  account_id: string;
  amount: string;
  date: string;
  type: string;
  description: string;
  currency: string;
  current_balance: string;
}

export interface TransferResponse extends Omit<Transfer, "amount"|"current_balance"> {
  amount: number;
  current_balance: number;
}

export interface TransferAddForm {
  accountId: string;
  amount: number;
  date?: string;
  type: string;
  description: string;
}