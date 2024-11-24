import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
  name: string,
  battery: number,
  connected: boolean
};

const style = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 7
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '15%'
    }
})

export default function AdapterItem({name, battery, connected}: Props) {
  return (
    <View style={style.container1}>
      <Text>{name}</Text>
      <View style={style.container2}>
        <Text>{battery + '%'}</Text>
        <> { connected ? <AntDesign name="cloudo"/> : <Ionicons name="cloud-offline"/> } </>
      </View>
    </View>
  );
}