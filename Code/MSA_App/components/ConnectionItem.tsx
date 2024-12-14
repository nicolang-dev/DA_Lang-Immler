import { Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Style";
import Adapter from "./Adapter";
import { router } from "expo-router";
import { useEffect } from "react";
import BatteryIndicator from "./BatteryIndicator";
import Station from "./Station";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";
import Connection from "./Connection";
import { getAdapters } from "./Utilities";
import axios from "axios";
import PlayPauseButton from "./PlayPauseButton";
import VolumeIndicator from "./VolumeIndicator";

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
    buttonContainer: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'space-between'
    }
})

export default function ConnectionItem({connection}: Props) {
  return (
    <View style={style.container}>
        <AdapterItem adapter={connection.adapter} selected={false}/>
        <StationItem station={connection.station} selected={false}/>
        <View style={style.buttonContainer}>
          <PlayPauseButton onSwitch={(paused: boolean) => {
            const url = "http://" + connection.adapter.name + ".local/setPaused";
            const data = {paused: paused};
            axios.put(url, data);
          }}/>
        </View>
    </View>
  );
}