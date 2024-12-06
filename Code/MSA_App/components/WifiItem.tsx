import { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "@/constants/Style";

type Props = {
  ssid: string,
  rssi: number,
  selected: boolean
};

const style = StyleSheet.create(
  {
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
      padding: 10,
      marginBottom: 7
  }
}
);

export default function WifiItem({ssid, rssi, selected}: Props) {
  return (
    <View style={[style.container, {backgroundColor: selected ? Colors.lightTurquoise : Colors.white}]}>
      <Text>{ssid}</Text>
      <Text>{rssi}</Text>
    </View>
  );
}