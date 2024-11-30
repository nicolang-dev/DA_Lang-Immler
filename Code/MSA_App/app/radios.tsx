import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import StationItem from "../components/StationItem";
import StationList from "../components/StationList";
import Station from "@/components/Station";

type Props = {
    country: string,
    language: string,
}

export default function Radios({country, language}: Props){
    const [stations, setStations] = useState(Array());
    const maxStations = 50;

    function addStation(station: Station){
        let stationArr = stations;
        stationArr.push(station);
        setStations(stationArr);
    }

    useEffect(()=>{
        if(country === undefined){
            country = "Austria";
        }
        if(language === undefined){
            language = "german";
        }
        const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
        axios.get(stationsUrl).then(resp => {
            resp.data.map((val, idx) => {
                const station = new Station(val.name, val.favicon, val.url);
                addStation(station);
            })
        }).catch(err => {
            console.error(err);
        })
    }, []);

    const style = StyleSheet.create({
        container: {
            alignItems: 'center',
        }
    })

    return(
        <View style={style.container}>
            <StationList stations={stations}/> 
        </View>
    )
}