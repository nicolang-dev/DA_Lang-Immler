import { SafeAreaView } from "react-native"
import ConnectionList from "@/components/ConnectionList";
import { GlobalStyle } from "@/constants/Style";
import { useEffect } from "react";

export default function ConnectionScreen(){
    return (
        <SafeAreaView style={GlobalStyle.page}>
            <ConnectionList onItemPress={()=>{}}/>
        </SafeAreaView>
    );
}