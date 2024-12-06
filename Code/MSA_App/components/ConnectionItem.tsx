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

export default function ConnectionItem({adapter, station}: Props) {
  return (
    <View>
        <AdapterItem adapter={adapter}/>
        <StationItem station={station} onPress={() => {}}/>
    </View>
  );
}