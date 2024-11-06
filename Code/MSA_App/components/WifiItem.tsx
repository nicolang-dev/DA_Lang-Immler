import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function WifiItem(ssid: string, rssi: number) {
  return (
    <View>
        <Text>{ssid}</Text>
    </View>
  );
}

//const styles = StyleSheet.create();