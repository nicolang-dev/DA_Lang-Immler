import { useEffect, useContext } from "react";
import { Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { UserContext } from "@/context/UserContext";
import { Authentication, CloudStorage } from "@/api/FirebaseAPI";
import { router } from "expo-router";
import Adapter from "@/types/Adapter";

export default function ProfileScreen(){
  const { user } = useContext(UserContext);

  useEffect(()=>{
  /*const stations: Station[] = [
    {uuid: "1", name: "one", iconUrl: "icon1", url: "url1"},
    {uuid: "2", name: "two", iconUrl: "icon2", url: "url2"}
  ];*/
  const adapters: Adapter[] = [
    {name: "adapter1", mac: "1", volume: 100, battery: 100, streamUrl: "example"},
    {name: "adapter2", mac: "2", volume: 100, battery: 100, streamUrl: "example"}
  ];
  CloudStorage.setAdapterList(adapters).then(() => {
    console.log("set");
  })
  }, []);

  const style = StyleSheet.create({
    inputContainer: {
      alignItems: 'center'
    }, error: {
      color: Colors.red
    }
  })

  if(user !== null){
    return(
      <SafeAreaView style={GlobalStyle.page}>
        <Text>{"Email: " + user.email}</Text>
        <Button title="Abmelden" color={Colors.lightTurquoise} onPress={() => {
          Authentication.logOut().then(()=> router.replace("/"));
        }}/>
      </SafeAreaView>
    )
  }
}