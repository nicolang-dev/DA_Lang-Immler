import { Text, View, TextInput, FlatList, SafeAreaView, FlatListComponent, Pressable, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";
import WifiItem from "../components/WifiItem";
import axios from "axios";
export default function Configuration() {
    const [wifiList, setWiFiList] = useState(Array());
    const [wifiSsid, setWifiSsid] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");
    const [name, setName] = useState("multiroom_sound_adapter.local");    
    const [macAddress, setMacAddress] = useState("not set");

    function getWlanList(){
        const route = name + "/getAvailableNetworks";
        axios.request({
            method: 'get',
            url: route
        }).then(resp => {
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }

    function sendWifiCredentials(){
        const route = name + "/setWiFiCredentials";
        axios.post(route, {
            "ssid": wifiSsid,
            "password": wifiPassword
        }).catch(err => {
            console.error(err);
        })
    }

    function getMac(): string{
        const route = name + "/getMac";
        console.log(route);
        axios.get(route).then(resp => {
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
        return "mac not readable";
    }

    useEffect(()=>{
        const exampleList = [
            {ssid: "wifi1", rssi: 1},
            {ssid: "wifi2", rssi: 3},
            {ssid: "wifi3", rssi:2}
        ];
    
        setWiFiList(exampleList);
    }, []);

    return (
        <SafeAreaView>
            <Text>Select WiFi:</Text>
            <TextInput value={wifiSsid} onChangeText={(text) => {setWifiSsid(text)}}/>
            <Text>Password:</Text>
            <TextInput value={wifiPassword} onChangeText={(text) => {setWifiPassword(text)}}/>
            <Button title="send" onPress={(event) => {sendWifiCredentials()}}/>
            <Button title="get mac" onPress={(event) => {setMacAddress(getMac())}}/>
            <Text>{macAddress}</Text> 
        </SafeAreaView>
    );
}