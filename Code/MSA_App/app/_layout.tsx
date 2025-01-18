import { Stack } from 'expo-router';
import { UserDataProvider } from './UserDataContext';

export default function Layout() {
  return (
    <UserDataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    </UserDataProvider>
  );
}