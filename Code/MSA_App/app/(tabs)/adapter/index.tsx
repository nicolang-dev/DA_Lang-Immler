import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import { useEffect } from "react";
import Adapter from "@/app/types/Adapter";
import { MemoryService } from "@/app/services/MemoryService";

export default function AdapterScreen(){
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <AdapterList editable showOnlyAvailable={false} onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}