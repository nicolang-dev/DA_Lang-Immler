import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import StationItem from "../components/StationItem";
import StationList from "../components/StationList";
import Station from "@/components/Station";
import { addFavouriteStations, getStations } from "@/components/Utilities";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Radios(){
    const [stations, setStations] = useState(Array());
    const [selectedStations, setSelectedStations] = useState(Array());
    const maxStations = 50;
    const {country, language} = useLocalSearchParams();

    function handleStationPress(station: Station){
        if(selectedStations.includes(station)){ //remove station from list
            const idx = selectedStations.indexOf(station);
            selectedStations.splice(idx, 1);
        } else { //add station to list
            selectedStations.push(station);
        }
    }

    const style = StyleSheet.create({
        container: {
            
        },
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
            getStations(country, language, maxStations).then(res =>{
                if(res != null){
                    setStations(res);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, []);

    return(
        <View style={style.container}>
            <FlatList style={style.list} data={stations} renderItem={({item}) => 
                <StationItem station={item} onPress={() => handleStationPress(item)}/>
            }/>
            <Pressable onPress={() => {
                addFavouriteStations(selectedStations).then(res => {
                    router.navigate("/favouriteStations");
                })
            }}>
                <AntDesign style={style.icon} name="check" size={50} color="black"/>
            </Pressable>
        </View>
    )
}