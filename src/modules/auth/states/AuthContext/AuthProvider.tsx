import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/auth.service";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/user.type";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const data = await getUserInfo();
            setUser(data);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;