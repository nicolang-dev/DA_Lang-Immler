import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Authentication, CloudStorage } from "../api/FirebaseAPI";
import { MemoryService } from "../services/MemoryService";
import User from "../types/User";
import Adapter from "../types/Adapter";
import Station from "../types/Station";

type Props = {
    children: ReactNode;
};

type UserDataContextType = {
    user: User | null,
    adapterList: Adapter[] | null,
    stationList: Station[] | null
    dataLoaded: boolean
};

const defaultContext = {
    user: null,
    adapterList: null,
    stationList: null,
    dataLoaded: false
};

export const UserDataContext = createContext<UserDataContextType>(defaultContext);

export const UserDataProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(defaultContext.user);
    const [adapterList, setAdapterList] = useState<Adapter[] | null>(defaultContext.adapterList);
    const [stationList, setStationList] = useState<Station[] | null>(defaultContext.stationList);
    const [dataLoaded, setDataLoaded] = useState(defaultContext.dataLoaded);

    MemoryService.onUserChange((newUser: User | null) => {
        setUser(newUser);
    });

    Authentication.onAuthChange((newUser) => {
        console.log("user state changed!");
        setUser(newUser);
    })

    Authentication.onAuthReady(() => {
        console.log("auth ready!");
        MemoryService.getUser().then(user => {
            console.log("user:", user);
            setUser(user);
            if(user !== null && user.uid !== null){
                CloudStorage.getUserData(user.uid).then(userData => {
                    setAdapterList(userData.adapterList);
                    setStationList(userData.stationList);
                    setDataLoaded(true);
                }).catch(err => {
                    console.error(err)
                });
            }
        }).catch(err => {
            console.error(err);
        })
    })

    return(
        <UserDataContext.Provider value={{user, adapterList, stationList, dataLoaded}}>
            {children}
        </UserDataContext.Provider>
    )
}