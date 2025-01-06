import { SafeAreaView } from "react-native"
import { useEffect } from "react";
import { Memory } from "@/components/Utilities";
import ConnectionList from "@/components/ConnectionList";
import { GlobalStyle } from "@/constants/Style";

export default function ConnectionScreen(){
    useEffect(()=>{
        Memory.getConnections().then(res => {
            console.log("connections: ", res);
        })
    })
    return (
        <SafeAreaView style={GlobalStyle.page}>
            <ConnectionList onItemPress={()=>{}}/>
        </SafeAreaView>
    );
}