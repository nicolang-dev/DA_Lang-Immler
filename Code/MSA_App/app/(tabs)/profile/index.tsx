import { Text, Pressable, View, SafeAreaView, FlatList } from "react-native"
import { router } from "expo-router"
import { useEffect } from "react";
import { Memory, RadioBrowser } from "@/components/Utilities";
import Adapter from "@/components/Adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Station from "@/components/Station";
import AdapterItem from "@/components/AdapterItem";
import BatteryIndicator from "@/components/BatteryIndicator";
import { Colors, GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import FavouriteStationList from "@/components/FavouriteStationList";
import ConnectionItem from "@/components/ConnectionItem";
import { useState } from "react";
import PlayPauseButton from "@/components/PlayPauseButton";
import ConnectionList from "@/components/ConnectionList";
import Connection from "@/components/Connection";
import VolumeSelector from "@/components/VolumeSelector";
import Slider from "@react-native-community/slider";
import VerticalSlider from 'rn-vertical-slider';

export default function ProfileScreen(){
    const [value, setValue] = useState(0);
    return (
        <SafeAreaView style={GlobalStyle.page}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VerticalSlider
        value={value}
        onChange={(value) => setValue(value)}
        height={200}
        width={40}
        step={1}
        min={0}
        max={100}
        borderRadius={5}
        minimumTrackTintColor="#2979FF"
        maximumTrackTintColor="#D1D1D6"
        showIndicator
        renderIndicator={() => (
          <View
            style={{
              height: 40,
              width: 80,
              backgroundColor: '#2979FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>{value}</Text>
          </View>
        )}
        containerStyle={{ backgroundColor: '#e0e0e0', borderRadius: 10 }}
        sliderStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
      />
    </View>
        </SafeAreaView>
    );
}