import { Colors, GlobalStyle } from "@/constants/Style";
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
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    }
})

export default function ErrorScreen({errorText, buttonText, onButtonPress}: Props){
    return(
        <View style={style.container}>
            <Text style={[GlobalStyle.textBig, style.text]}>{errorText}</Text>
            <Button color={Colors.lightTurquoise} title={buttonText} onPress={() => onButtonPress()}/>
        </View>
    )
}