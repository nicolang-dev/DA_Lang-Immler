import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyle, Colors } from "@/constants/Style";

type Props = {
    batteryPercentage: number
};

export default function BatteryIndicator({batteryPercentage}: Props){
    let iconName: string;
    if(batteryPercentage < 0){

    } else if(batteryPercentage > 75){
        iconName = "battery-full";
    } else if(batteryPercentage > 50){
        iconName = "battery-three-quarters";
    } else if(batteryPercentage > 25){
        iconName = "battery-half";
    } else {
        iconName = "battery-quarter";
    }

    if(batteryPercentage > 0){
        return(
            <View>
                <FontAwesome name={iconName} size={24} color={Colors.white}/>
                <Text style={GlobalStyle.textMedium}>{batteryPercentage + "%"}</Text>
            </View>
        )
    } else {
        return(
            <Ionicons name="battery-charging" size={24} color={Colors.white} />
        )
    }
}