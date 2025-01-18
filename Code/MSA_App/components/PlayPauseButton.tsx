import { Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Style";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
    paused: boolean,
    onPress: Function
}

export default function PlayPauseButton({paused, onPress}: Props){
    return(
        <Pressable onPress={() => onPress()}>
            { paused 
                ? <Entypo name="controller-play" size={30} color={Colors.lightTurquoise}/>
                : <AntDesign name="pause" size={30} color={Colors.lightTurquoise}/>
            }
        </Pressable>
    )
}