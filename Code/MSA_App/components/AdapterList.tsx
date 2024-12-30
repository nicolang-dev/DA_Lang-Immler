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
    editable: boolean,
    showOnlyAvailable: boolean
}

export default function AdapterList({onItemSelect, editable, showOnlyAvailable}: Props){
    const [adapterList, setAdapterList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [selectedAdapter, setSelectedAdapter] = useState(null);

    function fetchData(){
        const result: Adapter[] = [];
        Memory.getAdapters().then(adapters => {
            setDataFetched(true);
            if(adapters !== null && adapters.length > 0){
                const allAdapters: Adapter[] = adapters;
                if(showOnlyAvailable){
                    Memory.getConnections().then(connections => {
                        if(connections !== null && connections.length > 0){
                            const usedAdapter: Adapter[] = [];
                            for(let connection of connections){
                                usedAdapter.push(connection.adapter);
                            }
                            for(let adapter of allAdapters){
                                if(usedAdapter.includes(adapter)){
                                    result.push(adapter);
                                }
                            }
                        }
                    })
                }
                setEmpty(false);
                setAdapterList(result);
            } else {
                setEmpty(true);
            }
        })
    }

    function handleItemPress(item: Adapter){
        if(selectedAdapter !== null && selectedAdapter.mac == item.mac){
            setSelectedAdapter(null);
            onItemSelect(null);
        } else {
            setSelectedAdapter(item);
            onItemSelect(item);
        }
    }

    function deleteItem(){
            if(selectedAdapter !== null){
                Memory.removeAdapter(selectedAdapter.mac).then(res => {
                    setSelectedAdapter(null);
                    fetchData();
                })
            }
        }
    
    function handleDeletePress(){
        if(selectedAdapter !== null){
            Alert.alert("Adapter löschen", 
                "Wollen Sie den Adapter '" + selectedAdapter.name + "' wirklich löschen?", 
                [{text: "Nein", onPress: ()=> {setSelectedAdapter(null)}}, {text: "Ja", onPress: ()=> {Memory.removeAdapter(selectedAdapter.mac).then(res => {fetchData()})}}])
        }
    }

    function isSelected(item: Adapter){
        if(selectedAdapter !== null && selectedAdapter.mac == item.mac){
            if((showOnlyAvailable && item.connected) || !showOnlyAvailable){
                return true;
            }
        }
        return false;
    }

    useEffect(()=>{
        fetchData();
        setInterval(fetchData, 5000);
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
                    <FlatList data={adapterList} renderItem={({item}) => 
                        <Pressable onPress={() => {handleItemPress(item)}}>
                            <AdapterItem adapter={item} selected={isSelected(item)}/> 
                        </Pressable>
                    }/>
                    {
                        editable &&
                        <View style={style.iconContainer}>
                             <AddToListButton onPress={() => router.push("/(tabs)/adapter/addAdapter")}/>
                                {
                                    selectedAdapter !== null &&
                                    <DeleteButton onPress={()=>{handleDeletePress()}}/>
                                }
                        </View>
                    }
                </View>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Du hast noch keine Adapter hinzugefügt!" buttonText="Adapter hinzufügen" onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <LoadingScreen text="Lade Adapter ..."/>
        )
    }
}