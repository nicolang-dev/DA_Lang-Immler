import { Button, SafeAreaView, Text } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { useState } from "react";
import AdapterList from "@/components/AdapterList";
import FavouriteStationList from "@/components/FavouriteStationList";
import Adapter from "@/components/Adapter";
import Station from "@/components/Station";
import Connection from "@/components/Connection";
import { router } from "expo-router";

export default function AddConnection(){
    const [selectedAdapter, setSelectedAdapter] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <Text style={GlobalStyle.textBig}>Adapter auswählen:</Text>
            <AdapterList onItemPress={(item: Adapter) => setSelectedAdapter(item)} selectable showOnlyConnected={false} editable={false}/>
            <Text style={GlobalStyle.textBig}>Station auswählen:</Text>
            <FavouriteStationList onItemPress={(item: Station) => setSelectedStation(item)} selectable editable={false}/>
            <Button title="Bestätigen" color={Colors.lightTurquoise} onPress={() => {
                if((selectedAdapter !== null) && (selectedStation !== null)){
                    const con = new Connection(selectedAdapter, selectedStation);
                    router.navigate({pathname: "/index", params: {connection: con}})
                }
            }}/>
        </SafeAreaView>
    )
}