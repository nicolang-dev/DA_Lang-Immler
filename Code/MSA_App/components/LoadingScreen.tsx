import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

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
            <ActivityIndicator size="large"/>
            <Text>{text}</Text>
        </View>
    )    
}