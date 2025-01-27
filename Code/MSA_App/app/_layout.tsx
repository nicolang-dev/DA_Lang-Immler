import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function Layout() {
  return(
    <UserProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='index'/>
      </Stack>
    </UserProvider>
  )
}