import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import {Colors, GlobalStyle} from "@/constants/Style";
import Adapter from "../types/Adapter";
import BatteryIndicator from "./BatteryIndicator";

type Props = {
  adapter: Adapter,
  selected: boolean
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
        alignContent: 'space-between',
        width: '20%'
    }
})
export default function AdapterItem({adapter, selected}: Props) {
  let backgroundColor = "lightgrey";
  if(selected){
    backgroundColor = Colors.lightTurquoise;
  } else if(adapter.connected){
    backgroundColor = Colors.grey;
  } else {
    backgroundColor = "lightgrey";
  }
  
  return (
    <View style={[style.container1, {backgroundColor: backgroundColor}]}>
      <View>
        <Text style={GlobalStyle.textBig}>{adapter.name}</Text>
        <Text style={GlobalStyle.textMedium}>{adapter.mac}</Text>
      </View>
      {adapter.connected 
        ? 
          <BatteryIndicator batteryPercentage={adapter.battery}/>
        : <Ionicons name="cloud-offline" size={24} color={Colors.white}/>
      }
    </View>
  );
}