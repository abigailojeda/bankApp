import { FormFieldProps } from "../../shared/types/FormField.types";

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
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  {
    name: "type",
    label: "Type",
    type: "dropdown",
    required: true,
    options: [
      { label: "Deposit", value: "deposit" },
      { label: "Withdrawal", value: "withdrawal" },
    ],
    placeholder: "Select a type"
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    required: true,
    placeholder: "Enter a description"
  },
];
