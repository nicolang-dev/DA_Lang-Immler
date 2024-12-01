import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import StationItem from "../components/StationItem";
import Station from "./Station";

type Props = {
    stations: Station[],
    onSelectedStationsChange: Function
}

export default function Radios({stations, onSelectedStationsChange}: Props){
    const [stationList, setStationList] = useState(Array());
    const [selectedStationList, setSelectedStationList] = useState(Array());

    useEffect(()=>{
        setStationList(stations);
    },[]);

    function handleItemPress(station: Station){
        const selectedStations = selectedStationList;
        if(selectedStationList.includes(station)){ //remove station from list
            const idx = selectedStations.indexOf(station);
            selectedStations.splice(idx, 1);
        } else { //add station to list
            selectedStations.push(station);
        }
        setSelectedStationList(selectedStations);
    }

    return(
        <View>
            <FlatList data={stationList} renderItem={({item}) => 
                <StationItem station={item} onPress={()=> {onSelectedStationsChange(selectedStationList)}}/>
            }/>
        </View>
    )
}