import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import AdapterItem from "@/components/AdapterItem";

export default function Adapters(){
    const [adapterList, setAdapterList] = useState([]);
    useEffect(()=>{
        /*const testList = [
            {name: "adapter1", hostname: "adapter1.local"},
            {name: "adapter2", hostname: "adapter2.local"},
            {name: "adapter3", hostname: "adapter3.local"}
        ];

        const str = JSON.stringify(testList);
        console.log(str);

        AsyncStorage.getAllKeys().then(keys => {
            console.log(keys);
        })

        AsyncStorage.setItem("adapterList", str);

        const key = "adapterList";
        const getAdapterList = async() => {
            try{
                const keys = await AsyncStorage.getAllKeys();
                if(keys.includes(key)){
                const adapterList = await AsyncStorage.getItem(key);
                    if(typeof adapterList === "string"){
                        return JSON.parse(adapterList);
                    } else {
                        return new Error("adapterList is not type string");
                    }
                } else {
                    return new Error("key adapterList is not set");
                }
            } catch(err) {
                console.error(err);
            }
        }
        getAdapterList().then(adapterList => {
            console.log(adapterList);
        })*/
    },[]);
}