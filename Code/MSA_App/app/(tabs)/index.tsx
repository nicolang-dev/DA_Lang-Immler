import { Text, Pressable } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { getStations } from "@/components/Utilities";

export default function Index(){
    useEffect(()=>{
        getStations("Austria", "german", 10).then(res => {
            console.log(res);
        })
    },[]);
    return (
        <Pressable onPress={() => {router.push("/radiosearch")}}>
            <Text>
                open new screen
            </Text>
        </Pressable>
    )
}