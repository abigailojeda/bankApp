import { formatDate } from "../../shared/helpers/formatter";
import { Transfer } from "../types/transfer.types";

export const getVisibleTransfers = (transfers: Transfer[], itemCount: number) =>
    transfers
      .sort((a, b) => Number(b.date) - Number(a.date))
      .slice(0, itemCount)
      .map((transfer) => ({
        ...transfer,
        date: formatDate(Number(transfer.date))
      }));

export const isValidTransaction = (currentBalance: number, amount: number, type: string) => {
    if (Number.isNaN(amount)) return new Error('Invalid amount');

    if (type === 'withdrawal' && Number(amount) > Number(currentBalance)) {
        return new Error('Insufficient funds');
    }
}