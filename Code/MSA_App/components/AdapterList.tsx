import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import Adapter from "../types/Adapter";
import AdapterItem from "./AdapterItem";
import LoadingScreen from "./LoadingScreen";
import { Alert } from "react-native";
import { MemoryService } from "@/services/MemoryService";
import { Functions } from "@/utils/Functions";

type Props = {
    onItemSelect: Function,
    editable: boolean,
    showOnlyAvailable: boolean
}

export default function AdapterList({onItemSelect, editable, showOnlyAvailable}: Props){
    const [adapterList, setAdapterList] = useState<Adapter[]>(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [selectedAdapter, setSelectedAdapter] = useState<Adapter|null>(null);

    function fetchData(){
        if(showOnlyAvailable){
            Functions.getAvailableAdapters().then(res => {
                setDataFetched(true);
                if(res !== null){
                    setAdapterList(res);
                    setEmpty(false);
                } else {
                    setEmpty(true);
                }
            })
        } else {
            MemoryService.getAllAdapters().then(res => {
                setDataFetched(true);
                if(res !== null){
                    setAdapterList(res);
                    setEmpty(false);
                } else {
                    setEmpty(true);
                }
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
                MemoryService.removeAdapter(selectedAdapter.mac).then(res => {
                    setSelectedAdapter(null);
                    fetchData();
                })
            }
        }
    
    function handleDeletePress(){
        if(selectedAdapter !== null){
            Alert.alert("Adapter löschen", 
                "Wollen Sie den Adapter '" + selectedAdapter.name + "' wirklich löschen?", 
                [{text: "Nein", onPress: ()=> {setSelectedAdapter(null)}}, {text: "Ja", onPress: ()=> {MemoryService.removeAdapter(selectedAdapter.mac).then(() => {fetchData()})}}])
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
        const interval = setInterval(fetchData, 5000);
        return () =>{
            clearInterval(interval);
        }
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
                    <ErrorScreen errorText="Kein Adapter verfügbar!" buttonText="Neuen Adapter hinzufügen" onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}/>
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