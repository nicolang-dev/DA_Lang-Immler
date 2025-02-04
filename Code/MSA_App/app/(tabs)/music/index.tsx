import { SafeAreaView } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import StationList from "@/components/StationList";

export default function MusicScreen(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <StationList editable onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}