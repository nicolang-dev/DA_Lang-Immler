import { Redirect, Stack } from 'expo-router';
import { UserDataProvider, UserDataContext } from './UserDataContext';
import { useContext } from 'react';
import { Colors } from '@/constants/Style';

export default function Layout() {
  const { dataLoaded, user } = useContext(UserDataContext);
  
  if(dataLoaded && user !== null){
    return(
      <Stack screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen name='(tabs)'/>
        </Stack>
    )
  } else {
    return(
      <Stack screenOptions={{
        headerStyle: {backgroundColor: Colors.grey},
        headerTitleStyle: {color: Colors.white}
      }}>
        <Stack.Screen name='login' options={{title: "Anmelden"}}/>
        <Stack.Screen name='register' options={{title: "Registrieren"}}/>
      </Stack>
    )
  }
}