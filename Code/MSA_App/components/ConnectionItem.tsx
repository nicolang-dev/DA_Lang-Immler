import { Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Style";
import Adapter from "./Adapter";
import { router } from "expo-router";
import { useState } from "react";
import BatteryIndicator from "./BatteryIndicator";
import Station from "./Station";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";

type Props = {
  adapter: Adapter,
  station: Station
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

export default function ConnectionItem({adapter, station}: Props) {
  return (
    <View style={style.container}>
        <AdapterItem adapter={adapter}/>
        <StationItem station={station} selected={false}/>
        <View>
          
        </View>
    </View>
  );
}