import Adapter from "@/components/Adapter";
import AdapterItem from "@/components/AdapterItem";
import { FlatList } from "react-native";
import { getAdapters } from "@/components/Utilities";
import { useEffect, useState } from "react";

export default function AdapterOverview(){
  const [adapterList, setAdapterList] = useState(new Array());
  useEffect(() => {
    getAdapters().then(res => {
      if(res != null){
        setAdapterList(res);
      } else {
        alert("adapter list is empty!");
      }
    })
  },[]);
  return(
    <FlatList data={adapterList} renderItem={({item}) => 
      <AdapterItem adapter={item}/>
    }/>
  )
}