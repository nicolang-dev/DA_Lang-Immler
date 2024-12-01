import Adapter from "@/components/Adapter";
import AdapterItem from "@/components/AdapterItem";
import { FlatList } from "react-native";
import { getAdapters } from "@/components/Utilities";
import { useEffect, useState } from "react";
import ErrorScreen from "@/components/ErrorScreen";
import { router } from "expo-router";

export default function AdapterOverview(){
  const [adapterList, setAdapterList] = useState(new Array());
  const [isEmpty, setEmpty] = useState(false);
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
      <FlatList data={adapterList} renderItem={({item}) => 
        <AdapterItem adapter={item}/>
      }/>
    )
  } else {
    return(
      <ErrorScreen errorText="Du hast noch keine Adapter hinzugefügt!" buttonText="Adapter hinzufügen" onButtonPress={() => router.push("/addAdapter")}/>
    )
  }
}