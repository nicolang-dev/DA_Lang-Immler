import { Pressable, StyleSheet } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Colors } from "@/constants/Style"

type Props = {
    onPress: Function
}

export default function DeleteButton({onPress}: Props){
    return (
        <Pressable onPress={onPress()}>
            <FontAwesome name="trash-o" size={30} color={Colors.red}/>
        </Pressable>
    )
}