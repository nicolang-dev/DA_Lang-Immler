import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button, Image, Pressable } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../../constants/Style";
import StationItem from "../../components/StationItem";
import StationList from "../../components/StationList";
import Station from "@/app/types/Station";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectFavouriteStations(){
    const [stationList, setStationList] = useState(new Array());

    const language = "german";
    const country = "Austria";
    const maxStations = 50;

    useEffect(()=>{
        let result = new Array();
        const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
        axios.get(stationsUrl).then(resp => {
            resp.data.map((val, idx) => {
                const station = new Station(val.name, val.favicon, val.url);
                result.push(station);
            })
            setStationList(result);
        }).catch(err => {
            console.error(err);
        });
    },[])

    let selectedStations = new Array();

    function handleStationPress(item: any){
        if(selectedStations.includes(item)){
            for(let i = 0; i < selectedStations.length; i++){
                if(selectedStations[i] == item){
                    selectedStations[i] = null;
                    console.log(selectedStations);
                }
            }
        } else {
            selectedStations.push(item);
            console.log(selectedStations);
        }
    }

    function addFavourites(){
        let favouriteStations;
        AsyncStorage.getItem("favouriteStations").then(res => {
            if(res != null){
                favouriteStations = JSON.parse(res);
                favouriteStations.push(selectedStations);
                AsyncStorage.setItem("favouriteStations", JSON.stringify(favouriteStations));
            } else {
                console.error("favourite station list is empty");
            }
        })
    }

    const style = StyleSheet.create({
        listContainer: {
            height: '90%'
        },
        list: {
            height: '90%'
        }, 
        buttonContainer: {
            alignItems: 'flex-end',
            marginTop: 10,
            marginRight: 10
        }
    })

    return(
        <View>
            <FlatList style={style.list} data={stationList} renderItem={({item}) => 
                <StationItem station={item} onPress={()=> handleStationPress(item)}></StationItem>
            }/>
            <View style={style.buttonContainer}>
                <Pressable onPress={()=>{
                    addFavourites();
                }}>
                    <AntDesign name="checkcircle" size={45}/>
                </Pressable>
            </View>
        </View>
    )
}