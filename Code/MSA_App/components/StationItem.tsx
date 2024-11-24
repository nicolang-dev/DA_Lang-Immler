import { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';

type Props = {
  name: string,
  icon: string
};

const style = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginBottom: 7
    }
})

export default function StationItem({name, icon}: Props) {
  return (
    <View style={style.container}>
      <Text>{name}</Text>
      <Image source={{uri: icon}} style={style.icon}/>
    </View>
  );
}