import { useEffect } from "react";
import { Text, View } from "react-native";

type Props = {
  ssid: string,
  rssi: number
};

export default function WifiItem({ssid, rssi}: Props) {
  return (
    <View>
      <Text>{ssid}</Text>
      <Text>{rssi}</Text>
    </View>
  );
}