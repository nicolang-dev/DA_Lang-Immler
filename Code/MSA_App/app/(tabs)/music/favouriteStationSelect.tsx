import { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { Colors, GlobalStyle } from "@/constants/Style";
import Station from "@/types/Station";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import StationItem from "@/components/StationItem";
import { RadioBrowserAPI } from "@/api/RadioBrowserAPI";
import { StationContext } from "@/context/StationContext";
import { CloudStorage } from "@/api/FirebaseAPI";

export default function Radios(){
    const [stations, setStations] = useState(Array());
    const [selectedStations, setSelectedStations] = useState(Array());
    const maxStations = 50;
    const {countryName, languageName} = useLocalSearchParams();
    const { stationList } = useContext(StationContext);

    function handleStationPress(station: Station){
        let newSelectedStations = [... selectedStations];
        if(newSelectedStations.includes(station)){ 
            const idx = newSelectedStations.indexOf(station);
            newSelectedStations.splice(idx, 1);
        } else {
            newSelectedStations.push(station);
        }
        let selectedNames: string[] = [];
        newSelectedStations.map((val) => {
            selectedNames.push(val.name);
        })
        console.log(selectedNames);
        setSelectedStations([... newSelectedStations]);
    }

    function isSelected(station: Station){
        let selectedUuids: string[] = [];
        selectedStations.forEach((val) => {
            selectedUuids.push(val.uuid);
        })
        let selected = selectedUuids.includes(station.uuid);
        return selected; 
    }

    const style = StyleSheet.create({
        list: {
            height: '90%'
        },
        icon: {
            marginTop: 10,
            marginRight: 20,
            alignSelf: 'flex-end'
        }
    })

    useEffect(()=>{
        if(typeof countryName === "string" && typeof languageName === "string"){
            RadioBrowserAPI.getStations(countryName, languageName, maxStations, stationList).then(res =>{
                console.log(res);
                if(res != null){
                    setStations(res);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, []);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <FlatList style={style.list} data={stations} renderItem={({item}) => 
                <Pressable onPress={() => handleStationPress(item)}>
                    <StationItem station={item} selected={isSelected(item)}/>
                </Pressable>
            }/>
            <Pressable onPress={() => {
                let newStationList;
                if(stationList != null){
                    newStationList = stationList.concat(selectedStations);
                } else {
                    newStationList = selectedStations;
                }
                console.log("new stationlist:", newStationList);
                try{
                    CloudStorage.setStationList(newStationList).then(() => {
                        router.replace("/music");
                    })
                }catch(err){
                    console.error(err);
                }
            }}>
                <AntDesign style={style.icon} name="check" size={50} color={Colors.lightTurquoise}/>
            </Pressable>
        </SafeAreaView>
    )
}