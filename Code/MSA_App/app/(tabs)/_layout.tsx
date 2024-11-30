import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.darkTurquoise, tabBarStyle: {backgroundColor: Colors.grey}}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ color }) => <Entypo name="home" size={28} color={color} />,
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
