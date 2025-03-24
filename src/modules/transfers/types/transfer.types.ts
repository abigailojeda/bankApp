import { FormFieldProps } from "../../shared/types/FormField.types";

export type TransferTypeKey = "updated" | "voided" | "reversal" | "deposit" | "withdrawal";

export const TransferTypeColorMap: Record<TransferTypeKey, string> = {
  updated: "text-blue",
  voided: "text-blue",
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

export interface TransferResponse
  extends Omit<Transfer, "amount" | "current_balance"> {
  amount: number;
  current_balance: number;
}

export interface TransferAddForm {
  accountId: number;
  amount: number;
  date?: string;
  type: string;
  description: string;
}

export const transferFormFields: FormFieldProps[] = [
  {
    name: "description",
    label: "Description",
    type: "text",
    required: true,
    placeholder: "Enter a description",
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    required: true,
    placeholder: "Insert an amount",
  },
  { name: "date", label: "Date", type: "date", required: true },
  {
    name: "type",
    label: "Transaction type",
    type: "dropdown",
    height: "500",
    required: true,
    options: [
      { label: "Deposit", value: "deposit" },
      { label: "Withdrawal", value: "withdrawal" },
    ],
    placeholder: "Select a type",
  },
];
