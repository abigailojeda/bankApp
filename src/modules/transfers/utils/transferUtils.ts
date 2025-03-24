import { formatDate } from "../../shared/helpers/formatter";
import { Transfer } from "../types/transfer.types";

export const getVisibleTransfers = (transfers: Transfer[], itemCount: number) =>
  transfers
    .sort((a, b) => {
      const dateDiff = Number(b.date) - Number(a.date);
      if (dateDiff !== 0) return dateDiff;
      return Number(b.id) - Number(a.id);
    })
    .slice(0, itemCount)
    .map((transfer) => ({
      ...transfer,
      date: formatDate(Number(transfer.date)),
    }));
