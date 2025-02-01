import { useEffect, useContext } from "react";
import { Text, Button, SafeAreaView, StyleSheet, View } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { UserContext } from "@/context/UserContext";
import { Authentication } from "@/api/FirebaseAPI";
import { router } from "expo-router";
import AdapterItem from "@/components/AdapterItem";
import StationItem from "@/components/StationItem";
import Station from "@/types/Station";
import Adapter from "@/types/Adapter";
import AdapterData from "@/types/AdapterData";
import AdapterList from "@/components/AdapterList";
import ConnectionItem from "@/components/ConnectionItem";
import Connection from "@/types/Connection";
import ConnectionList from "@/components/ConnectionList";
import ErrorScreen from "@/components/ErrorScreen";

export default function ProfileScreen(){
  const { user } = useContext(UserContext);
  const station1:Station = {name: "ORF Tirol", url: "", iconUrl: "https://orfodon.org/system/accounts/avatars/111/374/561/229/082/482/original/57acca969ede8452.png", uuid: ""};
  const station2:Station = {name: "Rock Antenne Österreich", url: "", iconUrl: "https://www.rockantenne.at/logos/station-rock-antenne-at/apple-touch-icon.png", uuid: ""};
  const adapter1: AdapterData = {name: "Adapter 1", mac: "00:1A:2B:3C:4D:5E", volume: 50, battery: 90, streamUrl: "", connected: true};
  const adapter2: AdapterData = {name: "Adapter 2", mac: "12:34:56:78:9A:BC", volume: 50, battery: 70, streamUrl: "", connected: true};
  const adapter3: AdapterData = {name: "Adapter 3", mac: "DE:AD:BE:EF:00:11", volume: 50, battery: 30, streamUrl: "", connected: false};

  const adapters = [];
  adapters.push(adapter1);
  adapters.push(adapter2);
  adapters.push(adapter3);

  const connection1: Connection = {adapter: adapter1, station: station1, paused: false};
  const connection2: Connection = {adapter: adapter2, station: station2, paused: true};

  const connections: Connection[] = [];
  connections.push(connection1);
  connections.push(connection2);

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

  /*if(user !== null){
    return(
      <SafeAreaView style={GlobalStyle.page}>
        <Text>{"Email: " + user.email}</Text>
        <Button title="Abmelden" color={Colors.lightTurquoise} onPress={() => {
          Authentication.logOut().then(()=> router.replace("/"));
        }}/>
      </SafeAreaView>
    )
  }*/

    return(
      <View /*style={{
        width: "95%",
        marginLeft: 10,
        marginTop: 30
      }}*/>
        <ErrorScreen errorText="Keine Adapter verfügbar!" buttonText="Neue Adapter hinzufügen" onButtonPress={()=>{}}/>
      </View>
    )
}