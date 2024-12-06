import { Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Style";
import { StyleSheet } from "react-native";

type Props = {
    onPress: Function
}

export default function AddToListButton({onPress}: Props){
    return (
        <Pressable style={{alignSelf: 'flex-start'}} onPress={() => onPress()}>
            <Entypo name="add-to-list" size={30} color={Colors.lightTurquoise} />
        </Pressable>
    )
}