import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import { useContext } from "react";
import { AdapterContext } from "@/context/AdapterContext";
import AdapterData from "@/types/AdapterData";
import { CloudStorage } from "@/api/FirebaseAPI";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect } from "react";
import { AdapterAPI } from "@/api/AdapterAPI";

export default function AdapterScreen(){
    const { adapterList, loaded } = useContext(AdapterContext);

    useEffect(() => {
        if(loaded){
            AdapterAPI.getAvailableNetworks("00:00:00:77:98:A0").then(res=>{
                console.log("available nets:", res);
            }).catch(err => {
                console.error(err);
            })
        }
    }, [loaded]);

    function deleteAdapter(selectedAdapter: AdapterData){
        let newAdapterList = [];
        for(let adapter of adapterList){
            if(!(selectedAdapter.mac == adapter.mac)){
                newAdapterList.push(adapter);
            }
        }
        CloudStorage.setAdapterList(newAdapterList);
    }

    if(loaded){
        return(
            <SafeAreaView style={GlobalStyle.page}>
                <AdapterList adapterList={adapterList} editable showOnlyAvailable={false} onItemSelect={() => {}} onDeleteAdapter={(adapter: AdapterData) => {deleteAdapter(adapter)}}/>
            </SafeAreaView>
        )
    } else {
        return(
            <SafeAreaView style={GlobalStyle.page}>
                <LoadingScreen text="Lade Adapter ..."/>
            </SafeAreaView>
        )
    }
}