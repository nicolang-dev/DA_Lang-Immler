import { Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors, GlobalStyle} from "@/constants/Style";
import Adapter from "./Adapter";
import { router } from "expo-router";
import { useEffect } from "react";
import BatteryIndicator from "./BatteryIndicator";
import Station from "./Station";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";
import Connection from "./Connection";
import { AdapterAPI, Memory } from "./Utilities";
import axios from "axios";
import PlayPauseButton from "./PlayPauseButton";
import VolumeIndicator from "./VolumeSelector";
import VolumeSelector from "./VolumeSelector";
import Feather from '@expo/vector-icons/Feather';

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
        borderRadius: 10
    },
    controlElementContainer: {
      alignItems: 'center'
    },
    xButton: {
      alignSelf: 'flex-end',
      paddingBottom: 15
    }
})

export default function ConnectionItem({connection}: Props) {
  function endConnection(){
    AdapterAPI.sendPauseStream(connection.adapter.name);
    AdapterAPI.sendStreamUrl(connection.adapter.name, "");
  }

  return (
    <View style={style.container}>
      <Pressable style={style.xButton} onPress={() => endConnection()}>
        <AntDesign name="disconnect" size={24} color={Colors.lightTurquoise} />
      </Pressable>
      <AdapterItem adapter={connection.adapter} selected={false}/>
      <StationItem station={connection.station} selected={false}/>
      <View style={style.controlElementContainer}>
        <PlayPauseButton onSwitch={(paused: boolean) => {
          if(paused){
            AdapterAPI.sendPauseStream(connection.adapter.name);
          } else {
            AdapterAPI.sendContinueStream(connection.adapter.name);
          }
        }}/>
        <VolumeSelector initVolumePercentage={connection.adapter.volume} onValueChange={(val: number) => {AdapterAPI.sendVolume(connection.adapter.name, val)}}/> 
      </View>
    </View>
  );
}