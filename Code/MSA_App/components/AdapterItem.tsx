import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors";
import Adapter from "./Adapter";

type Props = {
  adapter: Adapter
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

export default function AdapterItem({adapter}: Props) {
  return (
    <View style={style.container1}>
      <View>
        <Text style={{fontSize: 17}}>{adapter.getName()}</Text>
        <Text style={{fontSize: 10}}>{adapter.getMac()}</Text>
      </View>
      <View style={style.container2}>
        <Text>{adapter.getBattery() + '%'}</Text>
        <> { adapter.isConnected() ? <AntDesign name="cloudo"/> : <Ionicons name="cloud-offline"/> } </>
      </View>
    </View>
  );
}