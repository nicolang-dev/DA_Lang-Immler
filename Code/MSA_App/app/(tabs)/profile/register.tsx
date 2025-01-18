import { useEffect, useState } from "react";
import { Text, TextInput, Button, SafeAreaView, View, StyleSheet } from "react-native";
import { GlobalStyle, Colors } from "@/constants/Style";
import { router } from "expo-router";

export default function RegisterScreen(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(()=>{
    SupabaseAPI.signIn("pippo230306@outlook.de", "testpasssword").then(res => {
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
      <View style={style.inputContainer}>
        <Text style={GlobalStyle.textMedium}>E-Mail:</Text>
        <TextInput style={GlobalStyle.textMedium} onChangeText={(text) => {setEmail(text)}}/>
        <Text style={GlobalStyle.textMedium}>Passwort:</Text>
        <TextInput style={GlobalStyle.textMedium} onChangeText={(text) => {setPassword(text)}} secureTextEntry/>
      </View>
      <Button color={Colors.lightTurquoise} title="Registrieren" onPress={() => {
        SupabaseAPI.signIn(email, password).then(res => {
          console.log(res);
        }).catch(err => {
          setErrorText(err);
          console.error(err);
        })
      }}/>
      <Text style={[GlobalStyle.textMedium, style.error]}>{errorText}</Text>
      <Text style={GlobalStyle.textMedium}>Haben Sie bereits ein Konto?</Text>
      <Button color={Colors.lightTurquoise} title="Anmelden" onPress={() => {
        router.back();
      }}/>
    </SafeAreaView>
  )
}