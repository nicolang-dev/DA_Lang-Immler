import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { GlobalStyle, Colors } from "@/constants/Style";
import { useEffect } from "react";

type Props = {
    onMacInput: (mac: string) => void
}

export default function MacInput({onMacInput}: Props){
    const [firstField, setFirstField] = useState("");
    const [secondField, setSecondField] = useState("");
    const [thirdField, setThirdField] = useState("");

    useEffect(() => {
        let mac = firstField + ":" + secondField + ":" + thirdField;
        if(mac.length == 8){
            onMacInput(mac);
        }
    }, [firstField, secondField, thirdField]);

    function isInputValid(input: string){
        return (input.length <= 2 && /^[A-F0-9]+$/.test(input)) || (input.length == 0);
    }

    const style = StyleSheet.create({
        container:{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
        },
        input: {
            width: 70,
            fontSize: 18,
            borderColor: Colors.lightGrey,
            borderRadius: 5,
            borderWidth: 2,
            marginBottom: 20,
            marginTop: 5,
            color: Colors.white,
            textAlign: 'center',
        }
    })

    return(
        <View style={style.container}>
            <TextInput style={[GlobalStyle.textBig, style.input]} value={firstField} onChangeText={(text) => {
                let input = text.toUpperCase();
                if(isInputValid(input)){
                    setFirstField(input);
                }
            }}/>
            <Text style={GlobalStyle.textBig}>:</Text>
            <TextInput style={[GlobalStyle.textBig, style.input]} value={secondField} onChangeText={(text) => {
                let input = text.toUpperCase();
                if(isInputValid(input)){
                    setSecondField(input);
                }
            }}/>            
            <Text style={GlobalStyle.textBig}>:</Text>
            <TextInput style={[GlobalStyle.textBig, style.input]} value={thirdField} onChangeText={(text) => {
                let input = text.toUpperCase();
                if(isInputValid(input)){
                    setThirdField(input);
                }
            }}/>        
        </View>
    )
}