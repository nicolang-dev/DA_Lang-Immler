import { Text, Pressable, View, SafeAreaView, FlatList } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { getStations, addAdapter, getAdapters, removeAdapter, clearAdapterList, clearFavouriteStationList, getFavouriteStations, getLanguages, getCountries, addFavouriteStations, removeFavouriteStation } from "@/components/Utilities";
import Adapter from "@/components/Adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Station from "@/components/Station";
import AdapterItem from "@/components/AdapterItem";
import BatteryIndicator from "@/components/BatteryIndicator";
import { Colors, GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import FavouriteStationList from "@/components/FavouriteStationList";
import ConnectionItem from "@/components/ConnectionItem";
import { useState } from "react";

export default function Index(){
    const [adapter, setAdapter] = useState(null);
    const [station, setStation] = useState(null);
    useEffect(()=>{
        getAdapters().then(adapterList => {
            setAdapter(adapterList[0]);
            getFavouriteStations().then(stationList => {
                setStation(stationList[0]);
            })
        })
    }, []);

    if(adapter !== null && station !== null){
        return (
            <SafeAreaView style={GlobalStyle.page}>
                <ConnectionItem adapter={adapter} station={station}/>
            </SafeAreaView>
        );
    } else {
        return(
            <Text>not possible!</Text>
        )
    }
   
}