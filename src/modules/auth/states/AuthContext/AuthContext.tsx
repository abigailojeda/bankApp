import { createContext } from "react";
import { User } from "../../types/user.type";

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    error: Error | null;

    // The following functions are not implemented yet
    // register: (user: User) => void;
    // login: (username: string, password: string) => void;
    // logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: false,
    error: null,
    // register: () => { },
    // login: () => { },
    // logout: () => { },

});