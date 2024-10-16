import { ReactNode, createContext, useEffect, useState } from "react";
import { UserWhithoutPassword } from "../models/user.model";
import { login } from "../../services/auth/login";
import {
    getUserLocalStorage,
    saveUserLocalStorage,
    removeUserLocalStorage,
} from "../../services/auth/local-storage";

interface AuthenticationContextProps {
    user: UserWhithoutPassword | null;
    isAuthenticaded: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | null>(null);

export function AuthenticationProvider(props: { children: ReactNode }) {
    const [user, setUser] = useState<UserWhithoutPassword | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user) setUser(user);
    }, []);

    async function signIn(email: string, password: string) {
        try {
            setIsLoading(true);
            const user = await login({ email, password });
            saveUserLocalStorage(user);
            setUser(user);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function signOut() {
        setUser(null);
        removeUserLocalStorage();
    }

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticaded: !!user, user, isLoading, signIn, signOut }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
}
