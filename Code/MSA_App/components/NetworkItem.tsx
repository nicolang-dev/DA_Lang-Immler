import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from '@/constants/Colors';

type Props = {
  ssid: string,
  rssi: number,
  onPress: Function
};

const style = StyleSheet.create({
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

export default function NetworkItem({ssid, rssi, onPress}: Props) {
  return (
    <Pressable style={style.container} onPress={() => {onPress()}}>
        <Text>{ssid}</Text>
        <Text>{rssi}</Text> 
    </Pressable>
  );
}