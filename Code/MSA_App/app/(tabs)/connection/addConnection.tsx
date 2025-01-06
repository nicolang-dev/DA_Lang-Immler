import { Button, SafeAreaView, Text } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { useState, useEffect } from "react";
import AdapterList from "@/components/AdapterList";
import Adapter from "@/app/models/Adapter";
import Station from "@/app/models/Station";
import { router } from "expo-router";
import StationList from "@/components/StationList";
import { AdapterAPI } from "@/components/Utilities";

export default function AddConnection(){
    const [selectedAdapter, setSelectedAdapter] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if(selectedAdapter === null || selectedStation === null){
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [selectedAdapter, selectedStation]);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <Text style={GlobalStyle.textBig}>Adapter auswählen:</Text>
            <AdapterList editable={false} showOnlyAvailable onItemSelect={(item: Adapter) => {setSelectedAdapter(item)}}/>
            <Text style={GlobalStyle.textBig}>Station auswählen:</Text>
            <StationList editable={false} onItemSelect={(item: Station) => {setSelectedStation(item)}}/>
            <Button title="Bestätigen" disabled={buttonDisabled} color={Colors.lightTurquoise} onPress={() => {
                if((selectedAdapter !== null) && (selectedStation !== null)){
                    AdapterAPI.sendStreamUrl(selectedAdapter.name, selectedStation.url).then(() => {
                        router.back();
                    })  
                }
            }}/>
        </SafeAreaView>
    )
}