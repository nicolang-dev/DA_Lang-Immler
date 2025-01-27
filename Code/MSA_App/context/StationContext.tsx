import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CloudStorage } from "../api/FirebaseAPI";
import Station from "@/types/Station";
import { UserContext } from "./UserContext";

type Props = {
    children: ReactNode;
};

type StationContextType = {
    stationList: Station[]
};

const defaultContext = {
    stationList: []
};

export const StationContext = createContext<StationContextType>(defaultContext);

export const StationProvider = ({children}: Props) => {
    const { user } = useContext(UserContext);
    const [stationList, setStationList] = useState<Station[]>(defaultContext.stationList);

    useEffect(() => {
        if(user !== null){
            CloudStorage.onStationChange((newStationList: Station[]) => {
                setStationList(newStationList);
            })
        }
    }, [user]);

    return(
        <StationContext.Provider value={{stationList}}>
            {children}
        </StationContext.Provider>
    )
}