import { View, Text, Button, StyleSheet } from "react-native";

type Props = {
    errorText: string,
    buttonText: string,
    onButtonPress: Function
}

const style = StyleSheet.create({
})

export default function ErrorScreen({errorText, buttonText, onButtonPress}: Props){
    return(
        <View>
            <Text>{errorText}</Text>
            <Button title={buttonText} onPress={() => onButtonPress}/>
        </View>
    )
}