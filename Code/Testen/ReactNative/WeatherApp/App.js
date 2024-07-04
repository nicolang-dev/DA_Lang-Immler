import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [quote, setQuote] = useState("");

  useEffect(()=>{
    const options = {
      method: "GET"
    }

    fetch("http://de1.api.radio-browser.info/json/stations/bycountry/Germany")
    .then(res =>{
      console.log(res);
    })
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
