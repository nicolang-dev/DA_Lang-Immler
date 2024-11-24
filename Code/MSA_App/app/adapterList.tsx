import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { FlatList, Text, Pressable, View } from "react-native";
import AdapterItem from "../components/AdapterItem";
import axios from "axios";
import { router } from "expo-router";

export default function Adapters(){
    const [adapterList, setAdapterList] = useState(Array());
    useEffect(()=>{
        AsyncStorage.getItem("adapterList").then(result => {
            if(result !== null){
                const adapterListObj = JSON.parse(result);
                console.log(adapterListObj);
                setAdapterList(adapterListObj);
            } else {
                console.error("adapter list is empty");
            }
        }).catch(err => {
            console.error(err);
        });
        /*setInterval(()=>{
            adapterList.forEach((adapter) => {
                const url = adapter.name + ".local";
                try{
                    axios.get(url).then(resp => {
                        if(resp) {
                            adapter.connected = true;
                        }
                    }).catch(err => {
                        adapter.connected = false;
                    })
                } catch(err){
                    console.error(err);
                }
            })
        }, 10000);*/
    },[]);

    return(
        <View>
            <FlatList data={adapterList} renderItem={({item})=>
                <Pressable onPress={(event) => {
                    router.push({pathname: "/radios", params: {name: item.name, hostname: item.hostname}})
                }}>
                    <AdapterItem name={item.name} battery={item.battery} connected={item.connected}/>
                </Pressable>
            }/>
            <Pressable>
                <Text>Adapter hinzufügen</Text>
            </Pressable>
        </View>
    )
}