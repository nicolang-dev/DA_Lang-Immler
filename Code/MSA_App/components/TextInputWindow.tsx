import { useState } from "react";
import { Text, Button, View, TextInput, StyleSheet } from "react-native";
import { Colors, GlobalStyle } from "@/constants/Style";

type Props = {
    text: string,
    isPassword: boolean,
    onEnter: Function,
    onCancel: Function
}

const style = StyleSheet.create({
    container:{
        backgroundColor: Colors.grey,
        position: 'absolute',
        zIndex: 2,
        padding: 20,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 50
    },
    input: {
        borderColor: Colors.white,
        borderWidth: 0.2,
        marginTop: 20,
        color: Colors.white
    },
    container2: {
        flexDirection: 'row',
        marginTop: 20
    }
})

export default function TextInputWindow({text, isPassword, onEnter, onCancel}: Props){
    const [password, setPassword] = useState("");
    return(
        <View style={style.container}>
            <Text style={GlobalStyle.textMedium}>{text}</Text>
            <TextInput style={style.input} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={isPassword}/>
            <View style={style.container2}>
                <Button color={Colors.lightTurquoise} title="Abbrechen" onPress={() => {onCancel()}}/>
                <Button color={Colors.lightTurquoise} title="Bestätigen" onPress={() => {onEnter(password)}}/>
            </View>
        </View>
    )
}