import { useEffect } from "react";
import { Text, View } from "react-native";

export default function WifiItem(ssid: string, rssi: number) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>hello</Text>
    </View>
  );
}