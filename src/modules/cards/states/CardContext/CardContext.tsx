import { createContext } from "react";
import { Card } from "../../types/card.type";

export interface CardContextValue {
    cards: Card[];
    currentCard: Card | null;
    loading: boolean;
    error: Error | null;
    refreshCards: () => void;
    updateCurrentCard: (card: Card) => void;
    addCard: (card: Card) => void;
}

export const CardContext = createContext<CardContextValue>({
    cards: [],
    currentCard: null,
    loading: false,
    error: null,
    refreshCards: () => { },
    updateCurrentCard: () => { },
    addCard: () => { },
});