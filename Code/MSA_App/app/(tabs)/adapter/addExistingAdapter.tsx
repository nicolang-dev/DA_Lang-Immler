import { SafeAreaView, Text, TextInput, Button } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import { useContext, useState } from "react";
import { AdapterAPI } from "@/api/AdapterAPI";
import { AdapterContext } from "@/context/AdapterContext";
import AdapterData from "@/types/AdapterData";
import { CloudStorage } from "@/api/FirebaseAPI";

export default function AddExistingAdapter(){
    const [mac, setMac] = useState("");
    const { adapterList } = useContext(AdapterContext);
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <Text>Mac:</Text>
            <TextInput value={mac} onChangeText={(text) => setMac(text)}/> 
            <Button title="Suche!" onPress={() => {
                AdapterAPI.getInfo(mac).then(res => {
                    let newAdapterList = [... adapterList];
                    let adapter: AdapterData = {name: res.name, mac, volume: res.volume, battery: res.battery, streamUrl: res.streamUrl, connected: true}
                    newAdapterList.push(adapter);
                    CloudStorage.setAdapterList(newAdapterList);
                }).catch(err => {
                    alert("Adapter kann nicht gefunden werden! Versuche es erneut!")
                })
            }}/>
        </SafeAreaView>
    )
}