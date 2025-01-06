import { Text, Pressable, View, SafeAreaView, FlatList } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { Memory, RadioBrowserAPI } from "@/components/Utilities";
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
import PlayPauseButton from "@/components/PlayPauseButton";
import ConnectionList from "@/components/ConnectionList";
import Connection from "@/components/Connection";

export default function ConnectionScreen(){
    useEffect(()=>{
        Memory.getConnections().then(res => {
            console.log("connections: ", res);
        })
    })
    return (
        <SafeAreaView style={GlobalStyle.page}>
            <ConnectionList onItemPress={()=>{}}/>
        </SafeAreaView>
    );
}