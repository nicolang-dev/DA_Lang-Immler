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
import ConnectionItem from "./ConnectionItem";
import LoadingScreen from "./LoadingScreen";

type Props = {
    onItemPress: Function
}

export default function ConnectionList({onItemPress}: Props){
    const [connectionList, setConnectionList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    function fetchData(){
        Memory.getConnections().then(res => {
            setDataFetched(true);
            if(res !== null && res.length > 0){
                setEmpty(false);
                setConnectionList(res);
            } else {
                setEmpty(true);
            }
        })
    }

    useEffect(()=>{
        setInterval(fetchData, 5000);
    },[]);

    const style = StyleSheet.create({
        container: {
            width: '95%',
            alignSelf: 'center' 
        },
        icon: {
            alignSelf: 'flex-start'
        }
    })

    if(isDataFetched){
        if(!isEmpty){
            return(
                <View style={style.container}>
                    <FlatList data={connectionList} renderItem={({item}) => 
                        <Pressable onPress={() => onItemPress(item)}>
                            <ConnectionItem connection={item}/> 
                        </Pressable>
                    }/>
                    <AddToListButton onPress={() => router.push("/(tabs)/connection/addConnection")}/> 
                </View>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Es sind zurzeit keine Verbindungen vorhanden!" buttonText="Verbindung erstellen" onButtonPress={() => router.push("/(tabs)/connection/addConnection")}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <LoadingScreen text="Lade Verbindungen ..."/>
        )
    }
}