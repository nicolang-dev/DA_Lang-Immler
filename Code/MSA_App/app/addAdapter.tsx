import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, Button, FlatList, Modal, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { router } from "expo-router";
import NetworkItem from "@/components/NetworkItem";
import PasswortInputWindow from "@/components/PasswortInputWindow";
import { addAdapter, sendWlanCredentials } from "@/components/Utilities";
import Adapter from "@/components/Adapter";
import { GlobalStyle } from "@/constants/Style";

export default function AddAdapter(){
    const [isReachable, setReachable] = useState(false);
    const [loading, setLoading] = useState(true);
    const requestTimeout = 2500;
    const [adapterInfo, setAdapterInfo] = useState(null)
    const [networkList, setNetworkList] = useState(Array());
    const [selectedSsid, setSelectedSsid] = useState(null);

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
            fetchData();
        }).catch(err => {
            setLoading(false);
            console.error(err);
            setReachable(false);
        })
    }

    function fetchData(){
        let url = serverUrl + "/getInfo";
        axios.get(url).then(res => {
            setAdapterInfo(res.data);
            url = serverUrl + "/getAvailableNetworks";
            axios.get(url).then(res => {
                setNetworkList(res.data);
            }).catch(err => {
                console.error(err);
                setReachable(false);
            })
        }).catch(err => {
            console.error(err);
            setReachable(false);
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
            <SafeAreaView style={GlobalStyle.page}>
                <LoadingScreen text="Versuche Adapter zu erreichen..."/>
            </SafeAreaView>
        )
    } else {
        if(isReachable && (adapterInfo !== null) && (networkList.length > 0)){
            return(
                <View>
                    <Text>{"Name: " + adapterInfo.name}</Text>
                    <Text>{"Mac: " + adapterInfo.mac}</Text>
                    <Text>Mit WLAN verbinden:</Text>
                    <FlatList data={networkList} renderItem={({item}) => 
                        <NetworkItem ssid={item.ssid} rssi={item.rssi} onPress={() => {
                            setSelectedSsid(item.ssid);
                        }}/>
                    }/>
                    {selectedSsid !== null && 
                        <PasswortInputWindow ssid={selectedSsid} onEnter={(password: string) => {
                            sendWlanCredentials(selectedSsid, password, serverUrl);
                            const adapter = new Adapter(adapterInfo.name, adapterInfo.mac, adapterInfo.ip);
                            addAdapter(adapter).then(res => {
                                router.back();
                            }).catch(err => {
                                console.error(err);
                            })
                        }} onCancel={() => {setSelectedSsid(null)}}/>
                    }
                </View>
            )
        } else {
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Adapter nicht erreichbar. Versichere dich, dass du mit dem WLAN des Adapters verbunden bist!" buttonText="Nochmal Versuchen" onButtonPress={() => requestAdapter()}/>
                </SafeAreaView>
            )
        }
    }
}