import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { GlobalStyle, Colors } from "@/constants/Style";

type Props = {
    volumePercentage: number
};

export default function VolumeIndicator({volumePercentage}: Props){
    if(volumePercentage > 0){
        return(
            <View>
                <Feather name="volume-2" size={24} color={Colors.white}/>
                <Text style={GlobalStyle.textMedium}>{volumePercentage + "%"}</Text>
            </View>
        )
    } else {
        return(
            <Feather name="volume-x" size={24} color={Colors.white}/>
        )
    }
}