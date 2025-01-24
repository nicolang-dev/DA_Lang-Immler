import { useEffect, useContext } from "react";
import { Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { router } from "expo-router";
import { UserDataContext } from "@/app/UserDataContext";
import { MemoryService } from "@/services/MemoryService";

export default function ProfileScreen(){
  const userData = useContext(UserDataContext);

  useEffect(()=>{
  
  /*const stations: Station[] = [
    {uuid: "1", name: "one", iconUrl: "icon1", url: "url1"},
    {uuid: "2", name: "two", iconUrl: "icon2", url: "url2"}
  ];
  const adapters: Adapter[] = [
    {name: "adapter1", mac: "1", volume: 100, battery: 100, connected: false, streamUrl: "example"},
    {name: "adapter2", mac: "2", volume: 100, battery: 100, connected: false, streamUrl: "example"}
  ];*/
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
      <Text>{"Email: " + userData.email}</Text>
      <Button color={Colors.lightTurquoise} title="Abmelden" onPress={() => {
        MemoryService.deleteUserId().then(() => {
          console.log("user id deleted!");
          router.replace("/");
        })
      }}/>
    </SafeAreaView>
  )
}