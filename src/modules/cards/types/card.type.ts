import { User } from "../../auth/types/user.type";

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
