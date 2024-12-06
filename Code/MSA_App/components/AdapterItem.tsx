import { Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors, GlobalStyle} from "@/constants/Style";
import Adapter from "./Adapter";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import BatteryIndicator from "./BatteryIndicator";
import axios from "axios";
import VolumeIndicator from "./VolumeIndicator";

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
        alignContent: 'space-between',
        width: '20%'
    }
})
export default function AdapterItem({adapter}: Props) {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState(null);

  const requestInterval = 1000;

  useEffect(() => {
    const url = "http://" + adapter.ip + "/getInfo";
    const instance = axios.create({timeout: 2500});
    console.log(url);

    const interval = setInterval(() => {
      instance.get(url).then(res => {
        setConnected(true);
        setData(res.data);
      }).catch(err => {
        setConnected(false);
      })
    }, 5000);

    return () => {clearInterval(interval);};
  },[]);
  
  return (
    <View style={[style.container1, {backgroundColor: connected ? Colors.grey : "lightgrey"}]} onPress={() => {/*router.push({pathname: "/adapterView", params: {name: adapter.name, mac: adapter.mac, battery: adapter.battery}})*/}}>
      <View>
        <Text style={GlobalStyle.textBig}>{adapter.name}</Text>
        <Text style={GlobalStyle.textMedium}>{adapter.mac}</Text>
      </View>
      {connected 
        ? <View style={style.container2}>
            <VolumeIndicator volumePercentage={data.volume}/>
            <BatteryIndicator batteryPercentage={data.battery}/>
          </View>
        : <Ionicons name="cloud-offline" size={24} color={Colors.white}/>
      }
    </View>
  );
}