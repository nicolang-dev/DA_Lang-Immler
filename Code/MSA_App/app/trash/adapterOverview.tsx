import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { FlatList, Text, Pressable, View } from "react-native";
import AdapterItem from "../../components/AdapterItem";
import axios from "axios";
import { router } from "expo-router";
import AdapterList from "@/components/AdapterList";

export default function AdapterOverview(){
    function handlePress(item: any){
        router.push({pathname: "/adapterConfig", params: {adapter: item}});
    }
    return(
        <View>
           <AdapterList handlePress={handlePress}/>
        </View>
    )
}