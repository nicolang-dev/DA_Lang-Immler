import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";

type Props = {
    onItemPress: Function,
    selectable: boolean,
    editable: boolean
}

export default function FavouriteStationList({onItemPress, selectable, editable}: Props){
    const [stationList, setStationList] = useState(new Array());
    const [isDataFetched, setDataFetched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [selectedUuid, setSelectedUuid] = useState(null);

    function fetchData(){
        getFavouriteStations().then(res => {
            console.log(res);
            setDataFetched(true);
            if(res?.length != 0 && res != null){
                setStationList(res);
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        })
    }

    function deleteSelectedStation(){
        if(selectedUuid !== null){
            removeFavouriteStation(selectedUuid).then(res => {
                fetchData();
            })
        }
    }

    function addStation(){
        router.push("/radiosearch");
    }

    /*function handlePress(station: Station){
        if(selectedUuid === null){
            onItemPress(station);
        } else {
            setSelectedUuid(null);
        }
    }*/

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
            alignContent: 'space-between',
            width: '90%'
        }
    })

    if(isDataFetched){
        if(!isEmpty){
            return(
                <Pressable style={style.container} onPress={() => {setSelectedUuid(null)}}>
                    <FlatList style={style.list} data={stationList} renderItem={({item}) => 
                        <Pressable onPress={() => {
                            setSelectedUuid(item.uuid);
                            //handlePress(item);
                            onItemPress(item);
                        }}>
                            <StationItem station={item} selected={selectable && selectedUuid == item.uuid}/>
                        </Pressable>
                    }/>
                    {editable &&
                        <View style={style.iconContainer}>
                            <AddToListButton onPress={() => addStation()}/>
                            {selectedUuid !== null && <DeleteButton onPress={() => deleteSelectedStation()}/>}
                        </View>
                    }
                </Pressable>
            )
        } else {
            return (
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Du hast noch keine Favoriten hinzugefügt!" buttonText="Favoriten hinzufügen" onButtonPress={() => addStation()}/>
                </SafeAreaView>
            )
        }
    } else {
        return (
            <SafeAreaView style={GlobalStyle.page}>
                <Text style={GlobalStyle.textBig}>Lade Daten ...</Text>
            </SafeAreaView>
        )
    }
}