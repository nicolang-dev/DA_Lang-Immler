import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyle, Colors } from "@/constants/Style";

type Props = {
    batteryPercentage: number
};

type IconNameType = "battery-empty" | "battery-full" | "battery-three-quarters" | "battery-half" | "battery-quarter";

export default function BatteryIndicator({batteryPercentage}: Props){
    let iconName: IconNameType;
    if(batteryPercentage > 75){
        iconName = "battery-full";
    } else if(batteryPercentage > 50){
        iconName = "battery-three-quarters";
    } else if(batteryPercentage > 25){
        iconName = "battery-half";
    } else if(batteryPercentage > 0){
        iconName = "battery-quarter";
    } else {
        iconName = "battery-empty";
    }

    if(batteryPercentage >= 0){
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