import { View, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Style";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";
import Connection from "../types/Connection";
import PlayPauseButton from "./PlayPauseButton";
import VolumeSelector from "./VolumeSelector";
import { AdapterAPI } from "@/api/AdapterAPI";

type Props = {
  connection: Connection
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 20,
        marginBottom: 7
    },
    controlElementContainer: {
      alignItems: 'center'
    },
    xButton: {
      alignSelf: 'flex-end',
      paddingBottom: 15
    },
})

export default function ConnectionItem({connection}: Props) {
  function endConnection(){
    AdapterAPI.sendPauseStream(connection.adapter.mac).then(() => {
      AdapterAPI.sendStreamUrl(connection.adapter.mac, "");
    })
  }

  return (
    <View style={style.container}>
      <Pressable style={style.xButton} onPress={() => endConnection()}>
        <AntDesign name="disconnect" size={24} color={Colors.lightTurquoise} />
      </Pressable>
      <AdapterItem adapter={connection.adapter} selected={false} reachable={true}/>
      <StationItem station={connection.station} selected={false}/>
      <View style={style.controlElementContainer}>
        <PlayPauseButton paused={connection.paused} onPress={() => {}}/>
        <VolumeSelector initVolumePercentage={connection.adapter.volume} onValueChange={(val: number) => {AdapterAPI.sendVolume(connection.adapter.name, val)}}/> 
      </View>
    </View>
  );
}