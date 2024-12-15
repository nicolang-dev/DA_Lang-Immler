import { Stack } from 'expo-router';
import { Colors } from '@/constants/Style';

export default function Layout() {
  return (
    <Stack screenOptions={{
              headerStyle: {backgroundColor: Colors.grey},
              headerTitleStyle: {color: Colors.white},
              headerBackTitle: "Zurück"
              }}>
        <Stack.Screen name='index' options={{headerTitle: 'Verbindungen'}}/>
        <Stack.Screen name='addConnection' options={{headerTitle: 'Verbindung hinzufügen'}}/>
    </Stack>
  );
}