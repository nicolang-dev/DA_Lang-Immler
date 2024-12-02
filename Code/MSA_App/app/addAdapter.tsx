import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, Button, FlatList, Modal } from "react-native";
import { StyleSheet } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { router } from "expo-router";
import NetworkItem from "@/components/NetworkItem";

export default function AddAdapter(){
    const [isReachable, setReachable] = useState(false);
    const [loading, setLoading] = useState(true);
    const requestTimeout = 2500;
    const [adapterName, setAdapterName] = useState("");
    const [adapterMac, setAdapterMac] = useState("");
    const [networkList, setNetworkList] = useState(Array());

    const serverUrl = "http://192.168.178.38"; //for testing purposes

    function requestAdapter(){
        setLoading(true);
        const instance = axios.create({
            timeout: requestTimeout
        });
        const url = serverUrl;
        instance.get(url).then(res => {
            setLoading(false);
            setReachable(true);
            fetchInfo();
        }).catch(err => {
            setLoading(false);
            console.error(err);
            setReachable(false);
        })
    }

    function fetchInfo(){
        let url = serverUrl + "/getName";
        axios.get(url).then(res => {
            setAdapterName(res.data);
        }).catch(err => {
            console.error(err);
        })

        url = serverUrl + "/getMac";
        axios.get(url).then(res => {
            setAdapterMac(res.data);
        }).catch(err => {
            console.error(err);
        })

        url = serverUrl + "/getAvailableNetworks";
        axios.get(url).then(res => {
            setNetworkList(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        requestAdapter();
    },[]);

    const style = StyleSheet.create({
        container: {
            alignSelf: 'center'
        },
        text: {
            fontSize: 20,
            marginTop: 20,
        }
    })

    if(loading){
        return(
            <LoadingScreen text="Versuche Adapter zu erreichen..."/>
        )
    } else {
        if(isReachable && (adapterName.length > 0) && (adapterMac.length > 0) && (networkList.length > 0)){
            return(
                <View>
                    <Text>{"Name: " + adapterName}</Text>
                    <Text>{"Mac: " + adapterMac}</Text>
                    <FlatList data={networkList} renderItem={({item}) => 
                        <NetworkItem ssid={item.ssid} rssi={item.rssi} onPress={() => {
                            return(
                                <Modal>
                                    <Text>Test</Text>
                                </Modal>
                            )
                        }}/>
                    }/>
                </View>
            )
        } else {
            return(
                <View style={style.container}>
                    <ErrorScreen errorText="Adapter nicht erreichbar. Versichere dich, dass du mit dem WLAN des Adapters verbunden bist!" buttonText="Nochmal Versuchen" onButtonPress={() => requestAdapter()}/>
                </View>
            )
        }
    }
}