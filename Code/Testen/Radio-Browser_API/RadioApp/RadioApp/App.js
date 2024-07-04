import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [stationNames, setStationNames] = useState(null);

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: "Germany",
        limit: 3
      })
    }
      try {
        fetch("https://de1.api.radio-browser.info/json/stations/search", options)
        .then(resp => resp.json())
        .then(stations => {
          setDataLoaded(true);
          stationNamesArr = Array();
          for(const station of stations){
            stationNamesArr.push(station.name);
          }
          setStationNames(stationNamesArr);
        })
      } catch (error) {
        console.error(error);
      }
  }, []);

  if(dataLoaded){
   for(const stationName of stationNames){
    return(
      <View>
        <Text>{{stationName}}</Text>
      </View>
    )
   }
  }
}