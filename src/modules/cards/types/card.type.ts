import { User } from "../../auth/types/user.type";

export type CardTypeKey = "created" | "updated" | "deleted";

export const CardTypeColorMap: Record<CardTypeKey, string> = {
  created: "text-green",
  updated: "text-blue",
  deleted: "text-red"
};

export interface Card {
  id?: string;
  accountId: string;
  cardNumber: string;
}

export interface CardItemProps {
  card: Card;
  index: number;
  user: User | null;
}
