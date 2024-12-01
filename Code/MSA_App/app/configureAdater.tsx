import { Text, View, TextInput, FlatList, SafeAreaView, FlatListComponent, Pressable, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import WifiItem from "@/components/WifiItem";

export default function ConfigureAdapter(){
    const adapterServerIp = "http://192.168.178.38/"; //for testing purposes

    const networkTestList = [
        {ssid: "ssid1", rssi: 1},
        {ssid: "ssid2", rssi: 3},
        {ssid: "ssid3", rssi: 2}
    ];
    const [networkList, setNetworkList] = useState(Array());
    const [selectedSsid, setSelectedSsid] = useState("");
    const [password, setPassword] = useState("Passwort");

    const style = StyleSheet.create({
        textInput: {
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            padding: 5
        }
    })

    function setWlanCredentials(){
        const route = adapterServerIp + "setWlanCredentials";
        const data = "ssid=" + selectedSsid + "&password=" + password;
        axios.post(route, data).then(resp => {
            console.log("configured successfully");
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(()=>{
        const route = adapterServerIp + "getAvailableNetworks";
        axios.get(route).then(resp => {
            console.log(resp.data);
            setNetworkList(resp.data);
        }).catch(err => {
            console.error("adapter not reachable!");
        })
        //order list, with rssi descending
        /*for(let network of networkTestList){
            networkTestList.toSorted()
        }*/
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
            <Pressable onPress={(event) => {
                setSelectedSsid(item.ssid);
            }}> 
                <WifiItem ssid={item.ssid} rssi={item.rssi} selected={item.ssid == selectedSsid}></WifiItem>
            </Pressable>
        }>
        </FlatList>
        <TextInput style={style.textInput} onChangeText={(text) => {
            setPassword(text);
        }} value={password}/>
                <Button title="verbinden" onPress={(event) => {setWlanCredentials()}}></Button>
        </View>
    )
}