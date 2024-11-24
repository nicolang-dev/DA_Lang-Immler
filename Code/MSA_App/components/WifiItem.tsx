import { useEffect } from "react";
import { Text, View, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  ssid: string,
  rssi: number
};

function getWifiItem(bars: number){
  switch(bars){
    case 1:
      return "network-wifi-1-bar";
    case 2:
      return "network-wifi-2-bar";
    case 3:
      return "network-wifi-3-bar";
    case 4:
      return "network-wifi-4-bar";
  }
}

export default function WifiItem({ssid, rssi}: Props) {
  return (
    <View>
      <Text>{ssid}</Text>
      <MaterialIcons name={getWifiItem(rssi)}/>
    </View>
  );
}