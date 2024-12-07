import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Colors, GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import Station from "@/components/Station";
import { getAdapters, removeAdapter } from "@/components/Utilities";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import Adapter from "./Adapter";
import AdapterItem from "./AdapterItem";

type Props = {
    onItemPress: Function
}

export default function AdapterList({onItemPress}: Props){
    const [adapterList, setAdapterList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    function fetchData(){
        getAdapters().then(res => {
            setDataFetched(true);
            if(res?.length != 0 && res !== null){
                setAdapterList(res);
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        })
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
        }
    })

    if(isDataFetched){
        if(!isEmpty){
            return(
                <View style={style.container}>
                    <FlatList data={adapterList} renderItem={({item}) => 
                        <Pressable onPress={() => onItemPress(item)}>
                            <AdapterItem adapter={item}/> 
                        </Pressable>
                    }/>
                    <AddToListButton onPress={() => router.push("/addAdapter")}/>
                </View>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Du hast noch keine Adapter hinzugefügt!" buttonText="Adapter hinzufügen" onButtonPress={() => router.push("/addAdapter")}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <Text style={GlobalStyle.textBig}>Lade Daten ...</Text>
        )
    }
}