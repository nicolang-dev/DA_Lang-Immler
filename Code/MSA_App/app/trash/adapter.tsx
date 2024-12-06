import Adapter from "@/components/Adapter";
import AdapterItem from "@/components/AdapterItem";
import { FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { addAdapter, getAdapters } from "@/components/Utilities";
import { useEffect, useState } from "react";
import ErrorScreen from "@/components/ErrorScreen";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";
import { Colors, GlobalStyle } from "@/constants/Style";

const style = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 20
  },
  icon: {
    alignSelf: 'flex-end',
    marginTop: 5
  }
})

export default function AdapterOverview(){
  const [adapterList, setAdapterList] = useState(new Array());
  const [isEmpty, setEmpty] = useState(false);
  const [selectiveMode, setSelectiveMode] = useState(false);
  const [selectedAdapters, setSelectedAdapters] = useState(Array());

  function addSelectedAdapter(adapter: Adapter){
    const adapterList = selectedAdapters;
    adapterList.push(adapter);
    setSelectedAdapters(adapterList);
  }

  function removeSelectedAdapter(adapter: Adapter){
    const adapterList = selectedAdapters;
    const idx = adapterList.indexOf(adapter);
    adapterList.splice(idx, 1);
    setSelectedAdapters(adapterList);
  }

  useEffect(() => {
    getAdapters().then(res => {
      if(res != null){
          setAdapterList(res);
          setEmpty(false);
      } else {
          setEmpty(true);
      }
  })
  },[]);
  
  if(!isEmpty){
    return(
      <SafeAreaView style={GlobalStyle.page}>
        <View style={style.container}>
          <FlatList data={adapterList} renderItem={({item}) => 
          <Pressable onLongPress={() => {}}>
            <AdapterItem adapter={item} selected={false}/>
          </Pressable> 
          }/>
          <Pressable onPress={() => {router.push("/addAdapter")}}>
            <Entypo style={style.icon} name="add-to-list" size={30} color={Colors.lightTurquoise}/>
          </Pressable>        
        </View>
      </SafeAreaView>
    )
  } else {
    return(
      <ErrorScreen errorText="Du hast noch keine Adapter hinzugefügt!" buttonText="Adapter hinzufügen" onButtonPress={() => router.push("/addAdapter")}/>
    )
  }
}