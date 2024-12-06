import { useState } from "react";
import { Text, Button, View, TextInput, StyleSheet } from "react-native";

type Props = {
    ssid: string,
    onEnter: Function,
    onCancel: Function
}

const style = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 2,
        padding: 20,
        alignSelf: 'center',
        borderRadius: 10
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20
    },
    container2: {
        flexDirection: 'row',
        marginTop: 20
    }
})

export default function PasswortInputWindow({ssid, onEnter, onCancel}: Props){
    const [password, setPassword] = useState("");
    return(
        <View style={style.container}>
            <Text>Passwort für {ssid} eingeben:</Text>
            <TextInput style={style.input} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry/>
            <View style={style.container2}>
                <Button title="Abbrechen" onPress={() => {onCancel()}}/>
                <Button title="Bestätigen" onPress={() => {onEnter(password)}}/>
            </View>
        </View>
    )
}