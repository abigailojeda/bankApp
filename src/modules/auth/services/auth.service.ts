import { User } from "../types/user.type";

const GET_USER_INFO_QUERY = `
    query {
        user {
        id
        name
        surname
        username
        email
        phone
        }
    }
    `;

export async function getUserInfo(): Promise<User> {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_USER_INFO_QUERY }),
    });
    
    const result = await response.json();
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    return result.data.user;
    }
