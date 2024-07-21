import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

interface GlobalContextI {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: Models.Document | null;
    setUser: (value: Models.Document | null) => void;
    loading: boolean;
    error: string | null;
    setError: (value: string | null) => void;
}

const GlobalContext = createContext<GlobalContextI>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    loading: true,
    error: null,
    setError: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<Models.Document | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUser();
                setUser(result);
                setIsLoggedIn(true);
            } catch (error) {
                setError("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            loading,
            error,
            setError,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
