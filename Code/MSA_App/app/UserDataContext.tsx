import { createContext, useContext, useState } from "react";
import Station from "./types/Station";
import Adapter from "./types/Adapter";
import UserData from "./types/UserData";

const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const updateUserData = (newUserData: UserData) => {
        setUserData(newUserData);
    }

    return(
        <UserDataContext.Provider value={{userData, updateUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => {
    return useContext(UserDataContext);
}