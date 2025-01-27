import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "expo-router";
import { StyleSheet, Text } from "react-native";
import LoadingScreen from "@/components/LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyle } from "@/constants/Style";

export default function Index(){
    const { user, available } = useContext(UserContext);

    const style = StyleSheet.create({
        container: {
            alignItems: 'center'
        }
    })

    if(available){
        return( user !== null
            ? <Redirect href={"/(tabs)/connection"}/>
            : <Redirect href={"/(auth)/login"}/>
        )
    } else {
        return(
            <SafeAreaView style={[GlobalStyle.page, style.container]}>
                <Text style={GlobalStyle.textBig}>Willkommen in der MSA App!</Text>
                <LoadingScreen text="Lade Daten ..."/>
            </SafeAreaView>
        )
    }
}