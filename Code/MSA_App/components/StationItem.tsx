import { useEffect } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import Station from "./Station";

type Props = {
  station: Station,
  onPress: Function
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
        backgroundColor: Colors.white,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginBottom: 7
    }
})

export default function StationItem({station, onPress}: Props) {
  const [isSelected, setSelected] = useState(false);
  return (
    <Pressable style={[style.container, {backgroundColor: isSelected ? Colors.lightTurquoise : Colors.white}]} onPress={()=>{
      setSelected(!isSelected);
      onPress()}}>
        <Text>{station.getName()}</Text>
        <Image source={{uri: station.getIconUrl()}} style={style.icon}/>
    </Pressable>
  );
}