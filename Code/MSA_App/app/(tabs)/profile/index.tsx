import { useEffect, useContext } from "react";
import { Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { UserContext } from "@/context/UserContext";
import { Authentication } from "@/api/FirebaseAPI";
import { router } from "expo-router";

export default function ProfileScreen(){
  const { user } = useContext(UserContext);

  useEffect(()=>{
    /*const adapters = [
      {name: "Adapter1", mac: "A4:8C:DB:3F:72:1A"},
      {name: "Adapter2", mac: "C0:FF:EE:12:34:56"},
      {name: "Adapter3", mac: "7A:2B:9C:88:45:DE"},
    ]
    CloudStorage.setAdapterList(adapters).then(() => {
      console.log("set");
    })*/
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