import {  useState } from "react";
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { router } from "expo-router";
import { Authentication } from "../../api/FirebaseAPI";

export default function RegisterScreen(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const style = StyleSheet.create({
    inputContainer: {
      alignItems: 'center'
    }, error: {
      color: Colors.red
    },
    container: {
      backgroundColor: Colors.grey,
      width: '80%',
      alignSelf: 'center',
      marginTop: 70,
      padding: 10,
      borderRadius: 20,
      alignItems: 'center'
    },
    input: {
      fontSize: 18,
      borderColor: Colors.lightGrey,
      borderRadius: 5,
      borderWidth: 2,
      width: 200,
      marginBottom: 20,
      marginTop: 5,
      color: Colors.white,
      textAlign: 'center',
    }
  })

  return(
    <SafeAreaView style={GlobalStyle.page}>
      <View style={style.container}>
        <View style={style.inputContainer}>
          <Text style={GlobalStyle.textBig}>E-Mail:</Text>
          <TextInput style={style.input} onChangeText={(text) => {setEmail(text)}}/>
          <Text style={GlobalStyle.textBig}>Passwort:</Text>
          <TextInput style={style.input} onChangeText={(text) => {setPassword(text)}} secureTextEntry/>
        </View>
        <Button color={Colors.lightTurquoise} title="Registrieren" onPress={() => {
          Authentication.register(email, password).then(() => {
            console.log("redirecting to login");
            router.replace("/login");
          }).catch(err => {
            setErrorText(err.message);  
          })
        }}/>
        <Text style={[GlobalStyle.textMedium, style.error]}>{errorText}</Text>
        <Text style={GlobalStyle.textMedium}>Haben Sie bereits ein Konto?</Text>
        <Button color={Colors.lightTurquoise} title="Anmelden" onPress={() => {
          router.replace("/login");
        }}/>
      </View>
    </SafeAreaView>
  )
}