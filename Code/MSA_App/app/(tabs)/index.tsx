import { Text, Pressable } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { getStations, addAdapter, getAdapters, removeAdapter, clearAdapterList, clearFavouriteStationList, getFavouriteStations } from "@/components/Utilities";
import Adapter from "@/components/Adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index(){
    useEffect(()=>{
        /*clearAdapterList();
        clearFavouriteStationList();*/
        getFavouriteStations().then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
        
        getAdapters().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    },[]);
    return (
        <Pressable onPress={() => {router.push("/radiosearch")}}>
            <Text>
                open new screen
            </Text>
        </Pressable>
    )
}