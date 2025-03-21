import { User } from "../types/user.type";

const GET_USER_INFO_QUERY = `
    query {
        users {
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
    //By the moment, we are only interested in the first user, until we implement the login functionality
    return result.data.users[0];
    }
