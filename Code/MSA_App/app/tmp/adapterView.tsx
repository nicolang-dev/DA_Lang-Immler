import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Adapter from "@/app/models/Adapter";
import Slider from '@react-native-community/slider';
import { GlobalStyle } from "@/constants/Style";
import { Colors } from "react-native/Libraries/NewAppScreen";

const style = StyleSheet.create({
    slider:{
        width: '50%'
    }
})

export default function AdapterView(){
    const adapter = useLocalSearchParams();
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        const vol = parseInt(adapter.volume);
        setVolume(vol);
    },[])

    return(
        <SafeAreaView style={GlobalStyle.page}>
            <View>
                <Text style={GlobalStyle.textBig}>{adapter.name}</Text>
                <Text style={GlobalStyle.textBig}>{parseInt(adapter.battery) < 0 
                    ? "wird geladen"
                    : adapter.battery + "% Akku"
                }</Text>
                <Text style={GlobalStyle.textBig}>Stream:</Text>
                <Slider
                    style={style.slider}
                    onSlidingComplete={(val) => {setVolume(val)}}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor={Colors.darkTurquoise}
                />
                <Text style={GlobalStyle.textBig}>{volume}</Text>
                
            </View>
        </SafeAreaView>
    )
}