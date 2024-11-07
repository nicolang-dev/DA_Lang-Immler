import { Text } from "react-native";
import { StyleSheet } from "react-native";

export default function AdapterItem(name: string, batteryStatus: number){
    return(
        <Text>{name + batteryStatus + '%'}</Text>
    )
}