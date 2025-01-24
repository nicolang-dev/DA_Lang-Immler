import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, Button, FlatList, Modal, SafeAreaView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { router } from "expo-router";
import NetworkItem from "@/components/NetworkItem";
import TextInputWindow from "@/components/TextInputWindow";
import { addAdapter, sendWlanCredentials } from "@/components/Utilities";
import Adapter from "@/types/Adapter";
import { GlobalStyle, Colors } from "@/constants/Style";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function AddAdapter(){
    const [isReachable, setReachable] = useState(false);
    const [loading, setLoading] = useState(true);
    const requestTimeout = 2500;
    const [adapter, setAdapter] = useState(null);
    const [networkList, setNetworkList] = useState(Array());
    const [selectedSsid, setSelectedSsid] = useState(null);
    const [changeName, setChangeName] = useState(false);

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
            const newAdapter = new Adapter(res.data.name, res.data.mac, serverUrl);
            console.log(newAdapter);
            setAdapter(newAdapter);
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

    function changeAdapterName(name: string){
        const url = serverUrl + "/setName";
        const data = "name=" + name;
        axios.post(url, data).then(res => {
            const newAdapter = new Adapter(name, adapter.mac, adapter.ip);
            setAdapter(newAdapter);
            setChangeName(false);
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
        container2: {
            flexDirection: 'row'
        },
        icon: {
            marginLeft: 10
        },
        listContainer: {
            height: '30%',
        }
    })

    if(loading){
        return(
            <SafeAreaView style={GlobalStyle.page}>
                <LoadingScreen text="Versuche Adapter zu erreichen..."/>
            </SafeAreaView>
        )
    } else {
        if(isReachable && (adapter !== null) && (networkList.length > 0)){
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <View style={style.container2}>
                        <Text style={GlobalStyle.textBig}>{"Name: " + adapter.name}</Text>
                        <Pressable style={style.icon} onPress={() => setChangeName(true)}>
                            <FontAwesome6 name="edit" size={21} color={Colors.lightTurquoise}/>
                        </Pressable>
                    </View>
                    <Text style={GlobalStyle.textBig}>{"Mac: " + adapter.mac}</Text>
                    <Text style={GlobalStyle.textBig}>Mit WLAN verbinden:</Text>
                    <View style={style.listContainer}>
                        <FlatList data={networkList} renderItem={({item}) => 
                            <Pressable onPress={() => setSelectedSsid(item.ssid)}>
                                <NetworkItem ssid={item.ssid} rssi={item.rssi} selected={selectedSsid == item.ssid}/>
                            </Pressable> 
                        }/>
                    </View>
                    <Button title="Adapter hinzufügen" color={Colors.lightTurquoise}/> 
                    {selectedSsid !== null && 
                        <TextInputWindow text={"Passwort für " + selectedSsid + " eingeben:"} isPassword={true} onEnter={(password: string) => {alert(password)}} onCancel={() => {setSelectedSsid(null)}}/>
                    }
                    {changeName &&
                        <TextInputWindow text={"Neuen Namen für " + adapter.name + " eingeben:"} isPassword={false} onEnter={(name: string) => changeAdapterName(name)} onCancel={() => setChangeName(false)}/>
                    }
                </SafeAreaView>
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