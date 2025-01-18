import { View, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Style";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";
import Connection from "../app/types/Connection";
import PlayPauseButton from "./PlayPauseButton";
import VolumeSelector from "./VolumeSelector";
import { AdapterAPI } from "@/app/api/AdapterAPI";
import { useState } from "react";

type Props = {
  connection: Connection,
  onEndConnection: Function
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
    },
})

export default function ConnectionItem({connection, onEndConnection}: Props) {
  const [paused, setPaused] = useState(false);

  function endConnection(){
    AdapterAPI.sendPauseStream(connection.adapter.name).then(() => {
      AdapterAPI.sendStreamUrl(connection.adapter.name, "").then(() =>{
        onEndConnection();
      })
    })
  }

  return (
    <View style={style.container}>
      <Pressable style={style.xButton} onPress={() => endConnection()}>
        <AntDesign name="disconnect" size={24} color={Colors.lightTurquoise} />
      </Pressable>
      <AdapterItem adapter={connection.adapter} selected={false}/>
      <StationItem station={connection.station} selected={false}/>
      <View style={style.controlElementContainer}>
        <PlayPauseButton paused={paused} onPress={() => {
          if(!paused){
            AdapterAPI.sendPauseStream(connection.adapter.name).then(() =>{
              connection.paused = true;
              setPaused(true);
            })
          } else {
            AdapterAPI.sendContinueStream(connection.adapter.name).then(() =>{
              connection.paused = false;
              setPaused(false);
            })
          }
        }}/>
        <VolumeSelector initVolumePercentage={connection.adapter.volume} onValueChange={(val: number) => {AdapterAPI.sendVolume(connection.adapter.name, val)}}/> 
      </View>
    </View>
  );
}