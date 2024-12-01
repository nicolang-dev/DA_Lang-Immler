import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors } from "@/constants/Colors";
import StationItem from "@/components/StationItem";
import Station from "@/components/Station";
import { getFavouriteStations } from "@/components/Utilities";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";

export default function FavouriteStations(){
    const [favouriteStationList, setFavouriteStationList] = useState(new Array());
    const [isEmpty, setEmpty] = useState(true);

    function handleStationPress(station: Station){
        
    }

    useEffect(()=>{
        getFavouriteStations().then(res => {
            if(res != null){
                setFavouriteStationList(res);
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        })
    },[]);

    const style = StyleSheet.create({
        list: {
            width: '95%'
        },
        container: {
            alignItems: 'center' 
        }
    })

    if(!isEmpty){
        return(
            <View style={style.container}>
                <FlatList style={style.list} data={favouriteStationList} renderItem={({item}) => 
                    <StationItem station={item} onPress={() => handleStationPress(item)}/>
                }/>
                <Pressable>
                    <FontAwesome name="trash-o" size={30} color="black"/>
                </Pressable>
            </View>
        )
    } else {
        return (
            <ErrorScreen errorText="Du hast noch keine Favoriten hinzugefügt!" buttonText="Favoriten hinzufügen" onButtonPress={() => console.log("add favourite stations")}/>
        )
    }
}