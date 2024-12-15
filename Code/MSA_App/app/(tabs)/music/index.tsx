import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import FavouriteStationList from "@/components/FavouriteStationList";
import StationList from "@/components/StationList";

export default function MusicScreen(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <StationList editable onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}