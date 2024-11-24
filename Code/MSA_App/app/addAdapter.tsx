import { Text, View, TextInput, FlatList, SafeAreaView, FlatListComponent, Pressable, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import WifiItem from "@/components/WifiItem";

export default function AddAdapter(){
    const networkTestList = [
        {ssid: "ssid1", rssi: 1},
        {ssid: "ssid2", rssi: 3},
        {ssid: "ssid3", rssi: 2}
    ];
    const [networkList, setNetworkList] = useState(Array());
    const [selectedSsid, setSelectedSsid] = useState("");
    useEffect(()=>{
        //order list, with rssi descending
        for(let network of networkTestList){
            networkTestList.toSorted()
        }
        setNetworkList(networkTestList);
        /*
        const url = "192.168.0.1/getAvailableNetworks";
        axios.get(url).then(resp => {
            const availableNetworks = JSON.parse(resp.data);
            console.log(availableNetworks);
        }).catch(err => {
            console.error(err);
        })
        */
    }, [])

    return(
        <View>
            <FlatList data={networkList} renderItem={({item}) => 
                <Pressable onPress={(event) => setSelectedSsid(item.ssid)}>
                    <WifiItem ssid={item.ssid} rssi={item.rssi}/>
                </Pressable>
            }/> 
            <Text>{selectedSsid}</Text>
        </View>   
    )
}