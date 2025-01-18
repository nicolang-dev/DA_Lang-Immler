import { SafeAreaView, Text, TextInput, Button } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import { useState } from "react";
import { AdapterAPI } from "@/app/api/AdapterAPI";

export default function AddExistingAdapter(){
    const [name, setName] = useState("");
    return(
        <SafeAreaView style={GlobalStyle.page}>
            <Text>Name:</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)}/> 
            <Button title="Suche!" onPress={() => {
                AdapterAPI.getInfo(name).then(res => {
                    
                }).catch(err => {
                    
                })
            }}/>
        </SafeAreaView>
    )
}