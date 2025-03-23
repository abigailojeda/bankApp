import { formatDate } from "../../shared/helpers/formatter";
import { Transfer } from "../types/transfer.types";

export const getVisibleTransfers = (transfers: Transfer[], itemCount: number) =>
  transfers
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, itemCount)
    .map((transfer) => ({
      ...transfer,
      date: formatDate(Number(transfer.date)),
    }));
