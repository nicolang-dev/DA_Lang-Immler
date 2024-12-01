import { View, Text, Button, StyleSheet } from "react-native";

type Props = {
    errorText: string,
    buttonText: string,
    onButtonPress: Function
}

const style = StyleSheet.create({
    container:{
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
})

export default function ErrorScreen({errorText, buttonText, onButtonPress}: Props){
    return(
        <View style={style.container}>
            <Text style={style.text}>{errorText}</Text>
            <Button title={buttonText} onPress={() => onButtonPress()}/>
        </View>
    )
}