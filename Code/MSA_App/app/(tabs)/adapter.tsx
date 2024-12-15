import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";

export default function AdapterOverview(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <AdapterList editable onlyReachableSelectable={false} onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}