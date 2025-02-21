import { useState } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import TextInputWindow from "@/components/TextInputWindow";
import { AdapterAPI } from "@/api/AdapterAPI";
import { GlobalStyle, Colors } from "@/constants/Style";
import Network from "@/types/Network";
import NetworkList from "@/components/NetworkList";
import AdapterData from "@/types/AdapterData";
import AdapterItem from "@/components/AdapterItem";
import { AdapterContext } from "@/context/AdapterContext";
import { useContext } from "react";
import { router } from "expo-router";

export default function AddNewAdapter(){
    const [isReachable, setReachable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [requested, setRequested] = useState(false);
    const [adapter, setAdapter] = useState<AdapterData|null>(null);
    const [networkList, setNetworkList] = useState<Network[]|null>(null);
    const [selectedSsid, setSelectedSsid] = useState("");
    const { adapterList } = useContext(AdapterContext);

    const host = "http://192.168.0.1:8080";

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
            height: '30%'
        }
    })

    function requestAdapter(){
        setRequested(true);
        setLoading(true);
        AdapterAPI.getInfoFromHost(host).then(res => {
            setAdapter(res);
            AdapterAPI.getAvailableNetworks(res.mac).then(networks => {
                setNetworkList(networks);
                setLoading(false);
                setReachable(true);
            }).catch(err => {
                console.error(err);
                setLoading(false);
                setReachable(false);
            })
        }).catch(err => {
            console.error(err);
            setLoading(false);
            setReachable(false);
        })
    }

    if(!requested){
        return(
            <SafeAreaView style={GlobalStyle.page}>
                <Text style={GlobalStyle.textMedium}>
                    1. Aktiviere den CONFIG-Modus des Adapters {'('} Taster 5 Sekunden lang drücken{')'} {'\n'} 
                    2. Verbinde dich mit dem WLAN des Adapters, den du hinzufügen willst. {'('} Name: maa_xxxxxx{')'} {'\n'}
                    3. Wenn du mit dem WLAN verbunden bist, drücke hier auf "Suchen!".
                </Text>
                <Button title="Suchen!" color={Colors.lightTurquoise} onPress={() => requestAdapter()}/>
            </SafeAreaView>
        )
    } else {
        if(loading){
            return(
                <SafeAreaView style={GlobalStyle.page}>
                    <LoadingScreen text="Versuche Adapter zu erreichen..."/>
                </SafeAreaView>
            )
        } else {
            if(isReachable && (adapter !== null) && (networkList !== null)){
                let existsAlready = false;
                for(let existingAdapter of adapterList){
                    if(existingAdapter.mac == adapter.mac){
                        existsAlready = true;
                        break;
                    }
                }
                if(existsAlready){
                    return(
                        <SafeAreaView style={GlobalStyle.page}>
                            <ErrorScreen errorText={"Der Adapter mit der MAC '" + adapter.mac + "' existiert bereits!"} buttonText="zurück" onButtonPress={() => router.back()}/>
                        </SafeAreaView>
                    )
                }
                return(
                    <SafeAreaView style={GlobalStyle.page}>
                        <AdapterItem adapter={adapter} selected={false}/>
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
                            requestAdapter();
                        }}/>
                    </SafeAreaView>
                )
            }
        }
    }
}