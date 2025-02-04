import { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import Network from "@/types/Network";
import NetworkItem from "./NetworkItem";

type Props = {
    networks: Network[],
    onItemSelect: Function
}

export default function NetworkList({networks, onItemSelect}: Props){
    const [selectedNetwork, setSelectedNetwork] = useState<Network|null>(null);

    const style = StyleSheet.create({
        container: {
            width: '95%',
            alignSelf: 'center' 
        }
    })

    return(
        <View style={style.container}>
            <FlatList data={networks} renderItem={({item}) => 
                <Pressable onPress={() => {
                    setSelectedNetwork(item);
                    onItemSelect(item);
                }}>
                    <NetworkItem ssid={item.ssid} rssi={item.rssi} selected={(selectedNetwork !== null) && (item.ssid == selectedNetwork.ssid)}/>
                </Pressable>
            }/>
        </View>
    )
}