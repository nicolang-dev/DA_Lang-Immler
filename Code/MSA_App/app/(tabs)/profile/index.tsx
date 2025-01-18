import { useEffect, useState } from "react";
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { router } from "expo-router";
import { Authentication, Storage } from "@/app/api/FirebaseAPI";
import Adapter from "@/app/types/Adapter";
import Station from "@/app/types/Station";

export default function ProfileScreen(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(()=>{
    /*Authentication.register("pippo230306@outlook.de", "examplepw").then(() => {
        console.log("user registered");
    }).catch(err => {
        console.error(err);
    })*/
   /*Authentication.logIn("pippo230306@outlook.de", "test").then(res => {
    console.log(res);
   }).catch(err => {
    console.error(err);
   })*/
  const stations: Station[] = [
    {uuid: "1", name: "one", iconUrl: "icon1", url: "url1"},
    {uuid: "2", name: "two", iconUrl: "icon2", url: "url2"}
  ];
  const adapters: Adapter[] = [
    {name: "adapter1", mac: "1", volume: 100, battery: 100, connected: false, streamUrl: "example"},
    {name: "adapter2", mac: "2", volume: 100, battery: 100, connected: false, streamUrl: "example"}
  ];
  Storage.setUserData("J5kaKsQ2rvhVoEzvcOPKO1Fxtac2", stations, adapters).then(() => {
    console.log("data set");
  }).catch(err => {
    console.error(err);
  })
  Storage.getUserData("J5kaKsQ2rvhVoEzvcOPKO1Fxtac2").then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
  }, []);

  const style = StyleSheet.create({
    inputContainer: {
      alignItems: 'center'
    }, error: {
      color: Colors.red
    }
  })

  return(
    <SafeAreaView style={GlobalStyle.page}>
      
    </SafeAreaView>
  )
}