import { createContext, useState, useEffect, ReactNode } from "react";
import { SystemService } from "../services/SystemService";

type Props = {
    children: ReactNode;
};

type SystemDataContextType = {
    connectedToInternet: boolean
};

const defaultContext = {
   connectedToInternet: false
};

export const SystemDataContext = createContext<SystemDataContextType>(defaultContext);

export const SystemDataProvider = ({children}: Props) => {
    const [connectedToInternet, setConnectedToInternet] = useState(false);

    useEffect(() => {
        SystemService.isConnectedToInternet().then(res => {
            setConnectedToInternet(res);
        }).catch(err => {
            console.error(err);
        })
    }, []);

    return(
        <SystemDataContext.Provider value={{connectedToInternet}}>
            {children}
        </SystemDataContext.Provider>
    )
}