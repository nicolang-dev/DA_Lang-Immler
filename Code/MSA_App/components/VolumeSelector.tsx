import { Text, View, Button} from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet } from "react-native";

type Props = {
    initVolumePercentage: number,
    onValueChange: Function
};

const style = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    innerContainer: {
        flexDirection: 'row'
    }
})

export default function VolumeSelector({initVolumePercentage, onValueChange}: Props){
    const [volume, setVolume] = useState(initVolumePercentage);
    return(
        <View style={style.container}>
            {
                /*volume > 0 ? ( 
                        <Pressable onPress={() => setVolume(0)}>
                            <Feather name="volume-2" size={30} color={Colors.white}/>
                        </Pressable>
                )
                : (
                <Feather name="volume-x" size={30} color={Colors.white}/>
                )*/
            }
            <View style={style.innerContainer}>
                <Button title="-" color={Colors.lightTurquoise}
                    onPress={() => {if(volume > 0) {
                                        setVolume(volume-1)
                                        onValueChange(volume)
                                    }}}
                />
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={volume}
                    onSlidingComplete={(val) => onValueChange(volume)}
                    onValueChange={(val) => {setVolume(val)}}
                    vertical={true}
                    thumbTintColor={Colors.white}
                    style={{width: '50%'}}
                    minimumTrackTintColor={Colors.lightTurquoise}
                    maximumTrackTintColor={Colors.lightTurquoise}
                />
                <Button title="+" color={Colors.lightTurquoise}
                    onPress={() => {if(volume < 100) {
                                        setVolume(volume+1)
                                        onValueChange(volume)
                                    }}}
                />
            </View>
            <Text style={GlobalStyle.textBig}>{volume + "%"}</Text>
        </View>
    )
}