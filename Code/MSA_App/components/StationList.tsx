import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors, GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import Station from "@/components/Station";
import { Memory } from "@/components/Utilities";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import Adapter from "./Adapter";
import AdapterItem from "./AdapterItem";
import LoadingScreen from "./LoadingScreen";
import { Alert } from "react-native";

type Props = {
    onItemSelect: Function,
    editable: boolean
}

export default function StationList({onItemSelect, editable}: Props){
    const [stationList, setStationList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);

    function fetchData(){
        Memory.getFavouriteStations().then(res => {
            setDataFetched(true);
            if(res !== null && res.length > 0){
                setEmpty(false);
                setStationList(res);
            } else {
                setEmpty(true);
            }
        })
    }

    function handleItemPress(item: Station){
        if(selectedStation !== null && selectedStation.uuid == item.uuid){
            setSelectedStation(null);
            onItemSelect(null);
        } else {
            setSelectedStation(item);
            onItemSelect(item);
        }
    }

    function deleteItem(){
        if(selectedStation !== null){
            Memory.removeFavouriteStation(selectedStation.uuid).then(res => {
                setSelectedStation(null);
                fetchData();
            })
        }
    }
    
    function handleDeletePress(){
        if(selectedStation !== null){
            Alert.alert("Adapter löschen", 
                "Wollen Sie die Station '" + selectedStation.name + "' wirklich löschen?", 
                [{text: "Nein", onPress: ()=> {setSelectedStation(null)}}, {text: "Ja", onPress: ()=> {deleteItem()}}])
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const style = StyleSheet.create({
        container: {
            width: '95%',
            alignSelf: 'center' 
        },
        icon: {
            alignSelf: 'flex-start'
        },
        iconContainer:{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-between',
            alignSelf: 'center'
        }
    })

    if(isDataFetched){
        if(!isEmpty){
            return(
                <View style={style.container}>
                    <FlatList data={stationList} renderItem={({item}) => 
                        <Pressable onPress={() => {handleItemPress(item)}}>
                            <StationItem station={item} selected={selectedStation !== null && selectedStation.uuid == item.uuid}/>
                        </Pressable>
                    }/>
                    {
                        editable &&
                        <View style={style.iconContainer}>
                             <AddToListButton onPress={() => router.push("/(tabs)/music/radiosearch", { relativeToDirectory: true })}/>
                                {
                                    selectedStation !== null &&
                                    <DeleteButton onPress={()=>{handleDeletePress()}}/>

                                }
                        </View>
                    }
                </View>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Du hast noch keine Stationen hinzugefügt!" buttonText="Station hinzufügen" onButtonPress={() => router.push("/(tabs)/music/radiosearch")}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <LoadingScreen text="Lade Stationen ..."/>
        )
    }
}