import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="configuration" />
      <Stack.Screen name="radiosearch" />
      <Stack.Screen name="adapters" />
    </Stack>
  );
}