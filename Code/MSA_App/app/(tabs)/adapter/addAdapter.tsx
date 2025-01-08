import { useEffect, useState } from "react";
import { Text, View, Button, SafeAreaView, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import TextInputWindow from "@/components/TextInputWindow";
import { AdapterAPI } from "@/app/api/AdapterAPI";
import Adapter from "@/app/types/Adapter";
import { GlobalStyle, Colors } from "@/constants/Style";
import Network from "@/app/types/Network";
import NetworkList from "@/components/NetworkList";

export default function AddAdapter(){
    const [isReachable, setReachable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adapter, setAdapter] = useState<Adapter|null>(null);
    const [networkList, setNetworkList] = useState<Network[]|null>(null);
    const [selectedSsid, setSelectedSsid] = useState("");
    const [name, setName] = useState("");

    const host = "http://192.168.0.1:8080";

    useEffect(() => {
        setLoading(true);
        AdapterAPI.getInfoFromHost(host).then((res) => {
            setAdapter({name: res.name, mac: res.mac, battery: res.battery, volume: res.volume, connected: false, streamUrl: res.stationUrl});
            setLoading(false);
            setReachable(true);
            AdapterAPI.getAvailableNetworks(host).then(res => {
                setNetworkList(res);
            })
        }).catch(err => {
            setLoading(false);
            console.error(err);
            setReachable(false);
        })
    }, []);

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
        if(isReachable && (adapter !== null) && (networkList !== null)){
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <View style={style.container2}>
                        <Text style={GlobalStyle.textBig}>{"Name: " + adapter.name}</Text>
                        <TextInput value={adapter.name} onChangeText={(text) => {setName(text)}}/>
                    </View>
                    <Text style={GlobalStyle.textBig}>{"Mac: " + adapter.mac}</Text>
                    <Text style={GlobalStyle.textBig}>Mit WLAN verbinden:</Text>
                    <View style={style.listContainer}>
                        <NetworkList networks={networkList} onItemSelect={(item: Network) => setSelectedSsid(item.ssid)}/>
                    </View>
                    <Button title="Adapter hinzufügen" color={Colors.lightTurquoise}/> 
                    {selectedSsid.length > 0 && 
                        <TextInputWindow text={"Passwort für " + selectedSsid + " eingeben:"} isPassword={true} onEnter={(password: string) => {alert(password)}} onCancel={() => {setSelectedSsid("")}}/>
                    }
                </SafeAreaView>
            )
        } else {
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <ErrorScreen errorText="Adapter nicht erreichbar. Versichere dich, dass du mit dem WLAN des Adapters verbunden bist!" buttonText="Nochmal Versuchen" onButtonPress={() => {
                        console.error("function not available!");
                    }}/>
                </SafeAreaView>
            )
        }
    }
}