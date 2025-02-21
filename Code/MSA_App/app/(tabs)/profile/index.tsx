import { useContext } from "react";
import { Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { UserContext } from "@/context/UserContext";
import { Authentication } from "@/api/FirebaseAPI";
import { router } from "expo-router";
import ProfileIcon from "@/components/ProfileIcon";

export default function ProfileScreen(){
  const { user } = useContext(UserContext);

  const style = StyleSheet.create({
    inputContainer: {
      alignItems: 'center'
    }, error: {
      color: Colors.red
    },
    container: {
      alignItems: "center"
    }
  })

  if(user !== null){
    return(
      <SafeAreaView style={[GlobalStyle.page, style.container]}>
        <ProfileIcon/>
        <Text style={GlobalStyle.textBig}>{"Email: " + user.email}</Text>
        <Button title="Abmelden" color={Colors.lightTurquoise} onPress={() => {
          Authentication.logOut().then(()=> router.replace("/"));
        }}/>
      </SafeAreaView>
    )
  }
}