import { Stack } from 'expo-router/stack';
import { Colors } from '@/constants/Style';

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerStyle: {backgroundColor: Colors.grey},
      headerTitleStyle: {color: Colors.white},
      headerBackTitle: "Zurück",
      headerBackTitleStyle: {color: Colors.lightTurquoise}
    }}>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}

