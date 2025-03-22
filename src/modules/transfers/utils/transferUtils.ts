import { formatAmount, formatDate } from "../../shared/helpers/formatter";
import { TransferResponse } from "../types/transfer.types";

export const getVisibleTransfers = (transfers: TransferResponse[], itemCount: number) =>
    transfers
      .sort((a, b) => Number(b.date) - Number(a.date))
      .slice(0, itemCount)
      .map((transfer) => ({
        ...transfer,
        date: formatDate(Number(transfer.date)),
        amount: formatAmount(transfer.amount, transfer.currency),
        current_balance: formatAmount(transfer.current_balance, transfer.currency)
      }));
