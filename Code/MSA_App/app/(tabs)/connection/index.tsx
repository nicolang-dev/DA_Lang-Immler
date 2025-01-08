import { SafeAreaView } from "react-native"
import ConnectionList from "@/components/ConnectionList";
import { GlobalStyle } from "@/constants/Style";

export default function ConnectionScreen(){
    return (
        <SafeAreaView style={GlobalStyle.page}>
            <ConnectionList onItemPress={()=>{}}/>
        </SafeAreaView>
    );
}