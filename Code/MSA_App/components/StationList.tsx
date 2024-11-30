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
    selectedStations: Station[]
}

export default function Radios({stations, selectedStations}: Props){
    const [stationList, setStationList] = useState(Array());
    const [selectedStationList, setSelectedStationList] = useState(Array());

    useEffect(()=>{
        setStationList(stations);
        setSelectedStationList(selectedStations);
    },[]);

    function handleItemPress(station: Station){
        console.log("pressed");
        if(selectedStationList.includes(station)){
            removeSelectedStation(station);
        } else {
            addSelectedStation(station);
        }
    }

    function addSelectedStation(station: Station){
        let stationArr = selectedStationList;
        stationArr.push(station);
        setStationList(stationArr);
    }

    function removeSelectedStation(station: Station){
        let stationArr = selectedStationList;
        for(let i = 0; i < stationArr.length; i++){
            if(stationArr[i].equals(station)){
                stationArr[i] = null;
            }
        }
        setStationList(stationArr);
    }

    return(
        <View>
            <FlatList data={stationList} renderItem={({item}) => 
                <StationItem station={item} selected={selectedStationList.includes(item)} onPress={()=> {handleItemPress(item)}}/>
            }/>
        </View>
    )
}