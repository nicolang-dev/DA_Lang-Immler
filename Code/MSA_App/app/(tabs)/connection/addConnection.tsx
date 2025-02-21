import { Button, SafeAreaView, Text } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { useState, useEffect, useContext } from "react";
import AdapterList from "@/components/AdapterList";
import StationList from "@/components/StationList";
import Station from "@/types/Station";
import { router } from "expo-router";
import { AdapterAPI } from "@/api/AdapterAPI";
import AdapterData from "@/types/AdapterData";
import { AdapterContext } from "@/context/AdapterContext";
import { StationContext } from "@/context/StationContext";
import { ScrollView } from "react-native";

export default function AddConnection(){
    const [selectedAdapter, setSelectedAdapter] = useState<AdapterData|null>(null);
    const [selectedStation, setSelectedStation] = useState<Station|null>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { adapterList } = useContext(AdapterContext);
    const { stationList } = useContext(StationContext);

    useEffect(() => {
        if(selectedAdapter === null || selectedStation === null){
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [selectedAdapter, selectedStation]);

    return(
        <ScrollView style={GlobalStyle.page}>
            <Text style={GlobalStyle.textBig}>Adapter auswählen:</Text>
            <AdapterList adapterList={adapterList} editable={false} showOnlyAvailable onItemSelect={(item: AdapterData) => {setSelectedAdapter(item)}} onDeleteAdapter={()=>{}}/>
            <Text style={GlobalStyle.textBig}>Station auswählen:</Text>
            <StationList stationList={stationList} editable={false} onItemSelect={(item: Station) => {setSelectedStation(item)}} onDeleteStation={()=>{}}/>
            <Button title="Bestätigen" disabled={buttonDisabled} color={Colors.lightTurquoise} onPress={() => {
                if((selectedAdapter !== null) && (selectedStation !== null)){
                    AdapterAPI.sendStreamUrl(selectedAdapter.mac, selectedStation.url).then(() => {
                        router.back();
                    }).catch(err => {
                        console.error(err);
                    })  
                }
            }}/>
        </ScrollView>
    )
}