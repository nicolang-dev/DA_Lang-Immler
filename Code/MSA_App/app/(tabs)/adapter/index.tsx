import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

export default function AdapterScreen(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <AdapterList editable onlyReachableSelectable={false} onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}