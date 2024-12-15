import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import FavouriteStationList from "@/components/FavouriteStationList";

export default function MusicScreen(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <FavouriteStationList editable selectable onItemPress={() =>{}}/>
        </SafeAreaView>
    )
}