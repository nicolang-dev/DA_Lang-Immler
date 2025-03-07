import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StationProvider } from "@/context/StationContext";
import { AdapterProvider } from "@/context/AdapterContext";
import { UserProvider } from "@/context/UserContext";

export default function TabLayout() {
  return (
    <UserProvider>
      <AdapterProvider>
        <StationProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors.darkTurquoise,
              tabBarStyle: { backgroundColor: Colors.grey },
              tabBarInactiveTintColor: Colors.white,
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="connection"
              options={{
                title: "Verbindungen",
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="chain" size={28} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="adapter"
              options={{
                title: "Adapter",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="speaker-group" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="music"
              options={{
                title: "Musik",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="library-music" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profil",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-box"
                    size={28}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </StationProvider>
      </AdapterProvider>
    </UserProvider>
  );
}
