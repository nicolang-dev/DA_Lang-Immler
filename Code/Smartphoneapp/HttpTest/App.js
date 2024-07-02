import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://de1.api.radio-browser.info/json/stations/search", true);
  xhttp.onreadystatechange = () => {
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
    }
  }
  const data = {
    "country": "Germany"
  }
  xhttp.send(data);
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
