import { useEffect, useState } from "react";
import { CardContext } from "./CardContext";
import { createCardService, getCardsByAccount } from "../../services/cards.service";
import { Card } from "../../types/card.type";

interface CardProviderProps {
    children: React.ReactNode;
}
const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchCards = async () => {
        setLoading(true);
        try {
            //by the moment we are using a hardcoded account id
            const data = await getCardsByAccount("1");
            const formattedCards = data.map(cardResponse => ({
                accountId: cardResponse.account_id,
                cardNumber: cardResponse.card_number
            }));
            setCards(formattedCards);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    };

    const addCard = async (card: Card) => {
        try {
            await createCardService({ cardNumber: card.cardNumber, accountId: card.accountId });
            fetchCards();
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            throw err;
        }
    }

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <CardContext.Provider
            value={{
                cards,
                loading,
                error,
                refreshCards: fetchCards,
                currentCard: null,
                updateCurrentCard: () => { },
                addCard
            }}
        >
            {children}
        </CardContext.Provider>
    );
}

export default CardProvider;