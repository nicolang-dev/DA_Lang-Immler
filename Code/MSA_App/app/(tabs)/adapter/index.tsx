import { SafeAreaView } from "react-native";
import AdapterList from "@/components/AdapterList";
import { GlobalStyle } from "@/constants/Style";
import { useContext } from "react";
import { AdapterContext } from "@/context/AdapterContext";
import AdapterData from "@/types/AdapterData";
import { CloudStorage } from "@/api/FirebaseAPI";

export default function AdapterScreen(){
    const { adapterList } = useContext(AdapterContext);

    function deleteAdapter(selectedAdapter: AdapterData){
        let newAdapterList = [];
        for(let adapter of adapterList){
            if(!(selectedAdapter.mac == adapter.mac)){
                newAdapterList.push(adapter);
            }
        }
        CloudStorage.setAdapterList(newAdapterList);
    }
    
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <AdapterList adapterList={adapterList} editable showOnlyAvailable={false} onItemSelect={() => {}} onDeleteAdapter={(adapter: AdapterData) => {deleteAdapter(adapter)}}/>
        </SafeAreaView>
    )
}