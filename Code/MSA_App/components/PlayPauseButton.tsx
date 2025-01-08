import { Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Style";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";

type Props = {
    initVal: boolean,
    onSwitch: Function
}

export default function PlayPauseButton({initVal, onSwitch}: Props){
    const [paused, setPaused] = useState(false);
    return(
        <Pressable onPress={() => {
            setPaused(!paused);
            onSwitch(paused);
        }}>
            { paused 
                ? <Entypo name="controller-play" size={30} color={Colors.lightTurquoise}/>
                : <AntDesign name="pause" size={30} color={Colors.lightTurquoise}/>
            }
        </Pressable>
    )
}