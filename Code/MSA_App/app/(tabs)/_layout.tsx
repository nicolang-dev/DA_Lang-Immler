import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Style';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.darkTurquoise, tabBarStyle: {backgroundColor: Colors.grey}}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Verbindungen',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="connection" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="adapter"
        options={{
          title: 'Adapter',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="speaker-group" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favouriteStations"
        options={{
          title: 'Musik',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="library-music" color={color} />
        }}
      />
    </Tabs>
  );
}
