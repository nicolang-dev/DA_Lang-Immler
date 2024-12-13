import { Button, SafeAreaView, Text } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { useState } from "react";
import AdapterList from "@/components/AdapterList";
import FavouriteStationList from "@/components/FavouriteStationList";
import Adapter from "@/components/Adapter";
import Station from "@/components/Station";

export default function AddConnection(){
    const [selectedAdapter, setSelectedAdapter] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <Text style={GlobalStyle.textBig}>Adapter auswählen:</Text>
            <AdapterList onItemPress={(item: Adapter) => setSelectedAdapter(item)}/>
            <Text style={GlobalStyle.textBig}>Station auswählen:</Text>
            <FavouriteStationList onItemPress={(item: Station) => setSelectedStation(item)}/>
            <Button title="Bestätigen" color={Colors.lightTurquoise}/>
        </SafeAreaView>
    )
}