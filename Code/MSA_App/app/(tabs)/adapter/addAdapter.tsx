import { SafeAreaView, Button, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { router } from "expo-router";

export default function AddAdapter(){
    const style = StyleSheet.create({
        container: {
            justifyContent: 'center'
        }
    })
    return(
        <SafeAreaView style={[GlobalStyle.page, style.container]}>
            <Button color={Colors.lightTurquoise} title="Neuen Adapter hinzufügen" onPress={() => router.push("/(tabs)/adapter/addNewAdapter")}/>
            <Button color={Colors.lightTurquoise} title="Bestehenden Adapter hinzufügen" onPress={() => router.push("/(tabs)/adapter/addExistingAdapter")}/>
        </SafeAreaView>
    )
}