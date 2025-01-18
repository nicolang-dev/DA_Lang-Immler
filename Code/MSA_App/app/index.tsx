import { Redirect }  from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { router } from "expo-router";
import * as Network from "expo-network";

export default function Index(){
    const [connectedToInternet, setConnectedToInternet] = useState(false);

    useEffect(() => {
        Network.getNetworkStateAsync().then(res => {
            if(res.isInternetReachable !== undefined){
                setConnectedToInternet(res.isInternetReachable);
            }
        })

        Network.addNetworkStateListener((state) => {
            if(state.isInternetReachable !== undefined){
                setConnectedToInternet(state.isInternetReachable);
                if(!state.isInternetReachable){
                    router.navigate("/");
                }
            }
        })
    }, []);

    if(connectedToInternet){
        return (
            <Redirect href={"/(tabs)/connection"}/>
        )
    } else {
        return(
            <SafeAreaView>
                <Text>Not connected to internet!</Text>
            </SafeAreaView>
        )
    }
}