import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import { useContext, useEffect } from "react";
import { AdapterContext } from "@/context/AdapterContext";

export default function AdapterScreen(){
    const { adapterList, reachableAdapterMacs } = useContext(AdapterContext);
    useEffect(() => {
        console.log("adapterlist:" , adapterList);
        console.log("reachable macs:" , reachableAdapterMacs);
    }, []);
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <AdapterList editable showOnlyAvailable={false} onItemSelect={() => {}}/>
        </SafeAreaView>
    )
}