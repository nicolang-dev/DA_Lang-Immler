import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import arp from 'arp-lookup';

export default function App() {
  const [ipAddress, setIpAddress] = useState(null);

  // useEffect Hook to perform ARP scan on start
  useEffect(() => {
    // Call ARP scan function
    arp.getIPFromMACAddress('4C-EB-BD-02-28-0D')
      .then((ip) => {
        console.log('IP Address:', ip);
        setIpAddress(ip); // Set the IP address in the state
      })
      .catch((error) => {
        console.error('Error fetching IP:', error);
      });
  }, []); // Empty dependency array means it runs once on component mount

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {ipAddress && <Text>IP Address: {ipAddress}</Text>} {/* Display IP if available */}
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