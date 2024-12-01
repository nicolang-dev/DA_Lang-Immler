import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors } from "@/constants/Colors";
import StationItem from "@/components/StationItem";
import Station from "@/components/Station";
import { getFavouriteStations, removeFavouriteStations } from "@/components/Utilities";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import Entypo from '@expo/vector-icons/Entypo';

export default function FavouriteStations(){
    const [favouriteStationList, setFavouriteStationList] = useState(new Array());
    const [isEmpty, setEmpty] = useState(false);
    const [selectedStations, setSelectedStations] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);

    function handleStationPress(station: Station){
        const stationList = selectedStations;
        if(stationList.includes(station)){ //remove station from list
            const idx = stationList.indexOf(station);
            stationList.splice(idx, 1);
        } else { //add station to list
            stationList.push(station);
        }
        setSelectedStations(stationList);
    }

    function fetchData(){
        getFavouriteStations().then(res => {
            console.log(res);
            setDataFetched(true);
            if(res?.length != 0 && res != null){
                setFavouriteStationList(res);
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        })
    }

    useEffect(()=>{
        console.log("rendering");
        fetchData();
    },[]);

    const style = StyleSheet.create({
        list: {
            width: '95%'
        },
        container: {
            alignItems: 'center' 
        },
        iconContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            width: '90%'
        }
    })

    if(isDataFetched){
        if(!isEmpty){
            return(
                <View style={style.container}>
                    <FlatList style={style.list} data={favouriteStationList} renderItem={({item}) => 
                        <StationItem station={item} onPress={() => handleStationPress(item)}/>
                    }/>
                    <View style={style.iconContainer}>
                        <Pressable onPress={() => {
                            router.push("/radiosearch");
                        }}>
                            <Entypo name="add-to-list" size={30} color="black" />
                        </Pressable>
                        <Pressable onPress={() => {
                            removeFavouriteStations(selectedStations).then(() => {
                                fetchData();
                            })
                        }}>
                            <FontAwesome name="trash-o" size={30} color="black"/>
                        </Pressable>
                    </View>
                </View>
            )
        } else {
            return (
                <ErrorScreen errorText="Du hast noch keine Favoriten hinzugefügt!" buttonText="Favoriten hinzufügen" onButtonPress={() => router.push("/radiosearch")}/>
            )
        }
    } else {
        return (
            <Text>Loading ...</Text>
        )
    }
}