import { Text, StyleSheet, View } from "react-native";
import { Colors, GlobalStyle } from '@/constants/Style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  ssid: string,
  rssi: number,
  selected: boolean
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 7,
    }
})

function getWifiItem(rssi :number){
  if(rssi > -50){
    return "network-wifi";
  } else if(rssi > -60){
    return "network-wifi-3-bar";
  } else if(rssi > -70){
    return "network-wifi-2-bar";
  } else {
    return "network-wifi-1-bar";
  }
}

export default function NetworkItem({ssid, rssi, selected}: Props) {
  return (
    <View style={[style.container, {backgroundColor: selected ? Colors.lightTurquoise : Colors.grey}]}>
        <Text style={GlobalStyle.textMedium}>{ssid}</Text>
        <MaterialIcons name={getWifiItem(rssi)} size={24} color={Colors.white}/>
    </View>
  );
}