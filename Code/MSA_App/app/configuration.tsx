import { Text, View, TextInput, FlatList, SafeAreaView, FlatListComponent, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import WifiItem from "./components/WifiItem";
export default function Configuration() {
    const [wifiList, setWiFiList] = useState(Array());
    const [selectedSsid, setSelectedSsid] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");

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
            <Text>Password:</Text>
            <FlatList data={wifiList} renderItem={({item}) => 
                <Pressable onPress={()=>{
                    alert("pressed!");
                }}>
                    <Text>{item.ssid}</Text>
                </Pressable>
            }/>
            <TextInput onChangeText={(text) => {setWifiPassword(text)}}/>
            <Pressable onPress={()=>{
                console.log(selectedSsid);
                console.log(wifiPassword);
            }}>Save</Pressable>
        </SafeAreaView>
    );
}