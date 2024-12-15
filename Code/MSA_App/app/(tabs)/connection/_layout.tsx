import { Stack } from 'expo-router';
import { Colors } from '@/constants/Style';

export default function Layout() {
  return (
    <Stack screenOptions={{
              headerStyle: {backgroundColor: Colors.grey},
              headerTitleStyle: {color: Colors.white}
              }}>
        <Stack.Screen name='index'/>
        <Stack.Screen name='addConnection'/>
    </Stack>
  );
}