import { SafeAreaView, Text, View, Button } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import { useContext, useState } from "react";
import { AdapterAPI } from "@/api/AdapterAPI";
import { AdapterContext } from "@/context/AdapterContext";
import { CloudStorage } from "@/api/FirebaseAPI";
import MacInput from "@/components/MacInput";
import LoadingScreen from "@/components/LoadingScreen";
import { router } from "expo-router";

export default function AddExistingAdapter(){
    const [mac, setMac] = useState("");
    const [loading, setLoading] = useState(false);
    const { adapterList } = useContext(AdapterContext);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            {loading
                ? <LoadingScreen text="Suche Adapter ..."/>
                : <View>
                    <Text style={GlobalStyle.textBig}>Letzte drei Teile der MAC-Adresse:</Text>
                    <MacInput onMacInput={(mac: string) => {
                        setMac(mac);
                    }}/>
                    <Button title="Suche!" disabled={mac.length < 6} onPress={() => {
                        let fullMac = "00:00:00:" + mac;
                        setLoading(true);
                        AdapterAPI.getInfo(fullMac).then(res => {
                            let existsAlready = false;
                            for(let adapter of adapterList){
                                if(adapter.mac == res.mac){
                                    existsAlready = true;
                                    break;
                                }
                            }
                            if(!existsAlready){
                                let newAdapterList = [];
                                for(let adapterData of adapterList){
                                    let newAdapter = {name: adapterData.name, mac: adapterData.mac};
                                    newAdapterList.push(newAdapter);
                                }
                                let newAdapter = {name: res.name, mac: res.mac};
                                newAdapterList.push(newAdapter);
                                CloudStorage.setAdapterList(newAdapterList).then(() => {
                                    setLoading(false);
                                    router.navigate("/(tabs)/adapter");
                                })
                            } else {
                                alert("Adapter existiert bereits!");
                            }
                        }).catch(err => {
                            console.error(err);
                            alert("Adapter kann nicht gefunden werden! Versuche es erneut!");
                            setLoading(false);
                        })
                    }}/>
                </View> 
            }
        </SafeAreaView>
    )
}