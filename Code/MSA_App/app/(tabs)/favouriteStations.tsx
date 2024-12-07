import { SafeAreaView, StatusBar } from "react-native"
import { GlobalStyle } from "@/constants/Style"
import FavouriteStationList from "@/components/FavouriteStationList"
import Station from "@/components/Station"

export default function FavouriteStations(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <FavouriteStationList onItemPress={(station: Station) => console.log(station)}/>
        </SafeAreaView>
    )
}