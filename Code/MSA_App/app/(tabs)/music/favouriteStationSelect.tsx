import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable, SafeAreaView } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors, GlobalStyle } from "@/constants/Style";
import StationList from "@/components/StationList";
import Station from "@/components/Station";
import { Memory, RadioBrowser } from "@/components/Utilities";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import StationItem from "@/components/StationItem";

export default function Radios(){
    const [stations, setStations] = useState(Array());
    const [selectedStations, setSelectedStations] = useState(Array());
    const maxStations = 50;
    const {country, language} = useLocalSearchParams();

    function handleStationPress(station: Station){
        let newSelectedStations = [... selectedStations];
        if(newSelectedStations.includes(station)){ 
            const idx = newSelectedStations.indexOf(station);
            newSelectedStations.splice(idx, 1);
        } else {
            newSelectedStations.push(station);
        }
        let selectedNames: string[] = [];
        newSelectedStations.map((val) => {
            selectedNames.push(val.name);
        })
        console.log(selectedNames);
        setSelectedStations([... newSelectedStations]);
    }

    function isSelected(station: Station){
        let selectedUuids: string[] = [];
        selectedStations.forEach((val) => {
            selectedUuids.push(val.uuid);
        })
        let selected = selectedUuids.includes(station.uuid);
        return selected; 
    }

    const style = StyleSheet.create({
        list: {
            height: '90%'
        },
        icon: {
            marginTop: 10,
            marginRight: 20,
            alignSelf: 'flex-end'
        }
    })

    useEffect(()=>{
        if(typeof country === "string" && typeof language === "string"){
            RadioBrowser.getStations(country, language, maxStations).then(res =>{
                if(res != null){
                    setStations(res);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, []);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <FlatList style={style.list} data={stations} renderItem={({item}) => 
                <Pressable onPress={() => handleStationPress(item)}>
                    <StationItem station={item} selected={isSelected(item)}/>
                </Pressable>
            }/>
            <Pressable onPress={() => {
                Memory.addFavouriteStations(selectedStations).then(res => {
                    router.back();
                    router.back();
                })
            }}>
                <AntDesign style={style.icon} name="check" size={50} color={Colors.lightTurquoise}/>
            </Pressable>
        </SafeAreaView>
    )
}