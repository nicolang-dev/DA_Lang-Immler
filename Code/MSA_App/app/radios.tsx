import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import StationItem from "../components/StationItem";

type Props = {
    country: string,
    language: string,
}

export default function Radios({country, language}: Props){
    const [stations, setStations] = useState(Array());
    const maxStations = 100;

    useEffect(()=>{
        if(country === undefined){
            country = "Austria";
        }
        if(language === undefined){
            language = "german";
        }
        const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
        axios.get(stationsUrl).then(resp => {
            console.log(stationsUrl);
            console.log(resp.data);
            setStations(resp.data);
        }).catch(err => {
            console.error(err);
        })
    }, []);

    const defaultList = [
        {name: "fm4 | ORF", url: "url1", favicon: "https://tubestatic.orf.at/mojo/1_3/storyserver//tube/fm4/images/touch-icon-iphone-retina.png"},
        {name: "ORF Radio Wien", url: "url2", favicon: "https://orf.at/favicon.ico"}
    ];

    const style = StyleSheet.create({
        list: {
            width: '95%'
        },
        container: {
            alignItems: 'center' 
        }
    })

    return(
        <View style={style.container}>
            <FlatList style={style.list} data={stations} renderItem={({item}) => 
                <Pressable onPress={(event) => {
                    console.log(item.url);
                }}>
                <StationItem name={item.name} icon={item.favicon}/>
                </Pressable>
            }/>
        </View>
    )
}