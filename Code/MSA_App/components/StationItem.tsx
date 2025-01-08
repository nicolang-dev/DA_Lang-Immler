import { useEffect } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Colors, GlobalStyle } from '@/constants/Style';
import Station from "../app/types/Station";

type Props = {
  station: Station,
  selected: boolean
};

const style = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginBottom: 7
    }
})

export default function StationItem({station, selected}: Props) {
  return (
    <View style={[style.container, {backgroundColor: selected ? Colors.lightTurquoise : Colors.grey}]}>
        <Text style={GlobalStyle.textBig}>{station.name}</Text>
        <Image source={{uri: station.iconUrl}} style={style.icon}/>
    </View>
  );
}