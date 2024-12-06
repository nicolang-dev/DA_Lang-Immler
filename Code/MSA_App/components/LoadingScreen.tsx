import { GlobalStyle } from "@/constants/Style";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type Props = {
    text: string
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function LoadingScreen({text}: Props){
    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={Colors.white}/>
            <Text style={GlobalStyle.textMedium}>{text}</Text>
        </View>
    )    
}