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
import LoadingScreen from "./LoadingScreen";

type Props = {
    onItemPress: Function,
    selectable: boolean,
    editable: boolean
    onlyReachableSelectable: boolean
}

export default function AdapterList({onItemPress, selectable, editable, onlyReachableSelectable}: Props){
    const [adapterList, setAdapterList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [selectedMac, setSelectedMac] = useState(null);

    function fetchData(){
        getAdapters().then(res => {
            setDataFetched(true);
            if(res !== null){
                setEmpty(false);
                setAdapterList(res);
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
                    <FlatList data={adapterList} renderItem={({item}) => 
                        <Pressable onPress={() => {
                            if(onlyReachableSelectable && item.connected){
                                setSelectedMac(item.mac);
                            } else if(!onlyReachableSelectable){
                                setSelectedMac(item.mac);
                            }
                            onItemPress(item);
                        }}>
                            <AdapterItem adapter={item} selected={selectable && selectedMac == item.mac}/> 
                        </Pressable>
                    }/>
                    {
                        editable &&
                        <AddToListButton onPress={() => router.push("/addAdapter")}/>
                    }
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
            <LoadingScreen text="Lade Adapter ..."/>
        )
    }
}