import { Text, View, Button } from "react-native";
import { StyleSheet } from "react-native";

export default function AddAdapter(){
    const style = StyleSheet.create({
        container: {
            width: '80%',
            alignSelf: 'center'
        },
        text: {
            fontSize: 20,
            marginTop: 20,
        }
    })
    return(
        <View style={style.container}>
            <Text style={style.text}>1. Auf Knopf drücken, um Konfigurationsmodus zu starten (LED sollte Blau leuchten)</Text>
            <Text style={style.text}>2. Mit WLAN des Adaters verbinden</Text>
            <Button title={"Adapter hinzufügen"}/> 
        </View>
    )
}