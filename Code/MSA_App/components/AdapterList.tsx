import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { Memory } from "@/components/Utilities";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import Adapter from "../app/models/Adapter";
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
        if(showOnlyAvailable){
            Memory.getAvailableAdapters().then(res => {
                setAdapterList(res);
                setDataFetched(true);
                setEmpty(false);
            })
        } else {
            Memory.getAllAdapters().then(res => {
                setAdapterList(res);
                setDataFetched(true);
                setEmpty(false);
            })
        }
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
            if(showOnlyAvailable){
                return (
                    <ErrorScreen errorText="Keine Adapter verfügbar!" buttonText="Neuen Adapter hinzufügen" onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}/>
                )
            } else{
                return (
                    <ErrorScreen errorText="Du hast noch keine Adapter hinzugefügt!" buttonText="Adapter hinzufügen" onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}/>
                )
            }
        }
    } else {
        return (
            <LoadingScreen text="Lade Adapter ..."/>
        )
    }
}