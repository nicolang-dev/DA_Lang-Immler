import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Authentication, CloudStorage } from "../api/FirebaseAPI";
import User from "../types/User";

type Props = {
    children: ReactNode;
};

type UserContextType = {
    user: User | null,
    available: boolean
};

const defaultContext = {
    user: null,
    available: false
};

export const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(defaultContext.user);
    const [available, setAvailable] = useState(defaultContext.available);

    useEffect(() => {
        Authentication.onAuthChange((newUser) => {
            console.log("auth changed");
            console.log("user:", newUser);
            setUser(newUser);
            setAvailable(true);
        })
    }, []);

    return(
        <UserContext.Provider value={{user, available}}>
            {children}
        </UserContext.Provider>
    )
}