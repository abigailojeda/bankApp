export interface CardResponse {
  id: string;
  account_id: string;
  card_number: string;
}

const GET_CARDS_BY_ACCOUNT_QUERY = `
    query CardsByAccountId($account_id: ID!) {
      cardsByAccountId(account_id: $account_id) {
        id
        account_id
        card_number
      }
    }
  `;

const CREATE_CARD_MUTATION = `
    mutation CreateCard($account_id: ID!, $card_number: String!) {
      createCard(account_id: $account_id, card_number: $card_number) {
        id
        account_id
        card_number
      }
    }
  `;

const UPDATE_CARD_MUTATION = `
    mutation UpdateCard($id: ID!, $account_id: ID, $card_number: String) {
      updateCard(id: $id, account_id: $account_id, card_number: $card_number) {
        id
        account_id
        card_number
      }
    }
  `;

const DELETE_CARD_MUTATION = `
    mutation DeleteCard($id: ID!) {
      deleteCard(id: $id)
    }
  `;

export async function getCardsByAccount(
  accountId: string
): Promise<CardResponse[]> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_CARDS_BY_ACCOUNT_QUERY,
      variables: { account_id: accountId },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.cardsByAccountId;
}

export async function createCardService(cardData: {
  accountId: string;
  cardNumber: string;
}): Promise<CardResponse> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: CREATE_CARD_MUTATION,
      variables: {
        account_id: cardData.accountId,
        card_number: cardData.cardNumber,
      },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.createCard;
}

export async function updateCardService(cardData: {
  id: string;
  accountId?: string;
  cardNumber?: string;
}): Promise<CardResponse> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: UPDATE_CARD_MUTATION,
      variables: {
        id: cardData.id,
        account_id: cardData.accountId,
        card_number: cardData.cardNumber,
      },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.updateCard;
}

export async function deleteCardService(id: string): Promise<void> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: DELETE_CARD_MUTATION,
      variables: { id },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
}
