import { Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Style";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
    paused: boolean,
    active: boolean,
    onPress: Function
}

export default function PlayPauseButton({paused, active, onPress}: Props){
    let buttonColor: string;
    if(active){
        buttonColor = Colors.lightTurquoise;
    } else {
        buttonColor = Colors.grey;
    }
    return(
        <Pressable disabled={!active} onPress={() => onPress()}>
            { paused 
                ? <Entypo name="controller-play" size={30} color={buttonColor}/>
                : <AntDesign name="pause" size={30} color={buttonColor}/>
            }
        </Pressable>
    )
}