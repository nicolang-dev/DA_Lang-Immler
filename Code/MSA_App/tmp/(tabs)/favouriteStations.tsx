import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors, GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import Station from "@/types/Station";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import StationList from "@/components/StationList";

type Props = {
    onItemPress: Function,
    selectable: boolean,
    editable: boolean
}

export default function FavouriteStationList({onItemPress, selectable, editable}: Props){
    const [stationList, setStationList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    function fetchData(){
        getFavouriteStations().then(res => {
            setDataFetched(true);
            if(res !== null){
                setStationList(res);
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        })
    }

    useEffect(()=>{
       fetchData();
    },[]);

    if(isDataFetched){
        if(!isEmpty){
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <StationList editable onItemSelect={() =>{}}/>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Du hast noch keine Favoriten hinzugefügt!" buttonText="Favoriten hinzufügen" onButtonPress={() => router.push("/radiosearch")}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <SafeAreaView style={GlobalStyle.page}>
                <Text style={GlobalStyle.textBig}>Lade Daten ...</Text>
            </SafeAreaView>
        )
    }
}