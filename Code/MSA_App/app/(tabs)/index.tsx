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

export default function Index(){
    useEffect(()=>{
        
    }, []);

    return (
        <SafeAreaView style={GlobalStyle.page}>
            <Text style={GlobalStyle.textBig}>index page</Text>
        </SafeAreaView>
    );
}