import { useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { Redirect } from "expo-router";

export default function Index(){
    const { dataLoaded, user } = useContext(UserDataContext);

    if(dataLoaded && user !== null){
        return (
            <Redirect href={"/(tabs)/connection"}/>
        )
    } else {
        return (
            <Redirect href={"/(auth)"}/>
        )
    }
}