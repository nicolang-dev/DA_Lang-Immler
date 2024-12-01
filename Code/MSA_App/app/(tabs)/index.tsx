import { Text, Pressable } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { getStations, addAdapter, getAdapters, removeAdapter, clearAdapterList, clearFavouriteStationList, getFavouriteStations, getLanguages, getCountries, addFavouriteStations, removeFavouriteStations } from "@/components/Utilities";
import Adapter from "@/components/Adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Station from "@/components/Station";
import AdapterItem from "@/components/AdapterItem";

export default function Index(){
    useEffect(()=>{
        /*getLanguages().then(res => {
            console.log(res);
        });*/

        /*clearAdapterList();
        clearFavouriteStationList();*/

        /*const station1 = new Station(1, "testname", "testicon", "testurl");
        const stationList = [];
        stationList.push(station1);*/

        //addFavouriteStations(stationList);

        /*const stations = [
            new Station("uuid1", "name", "icon", "url"),
            new Station("uuid2", "name", "icon", "url"),
            new Station("uuid3", "name", "icon", "url")
        ];

        const stations2 = [
            new Station("uuid1", "name", "icon", "url"),
            new Station("uuid3", "name", "icon", "url")
        ];

        addFavouriteStations(stations).then(() => {
            console.log("adding stations");
            getFavouriteStations().then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        });
        
        removeFavouriteStations(stations2).then(() => {
            console.log("removing stations");
            getFavouriteStations().then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        })*/
        /*addFavouriteStations(stations).then(() => {
            console.log("stations added");
        })*/

        

        /*
        getAdapters().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });*/
    },[]);
    return (
        <AdapterItem adapter={new Adapter("Adapter1", "example_mac", true, 75)}/>
    )
}