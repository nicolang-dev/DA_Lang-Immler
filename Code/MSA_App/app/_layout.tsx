import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { black, grey, lightTurquoise, darkTurquoise, white } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: darkTurquoise, tabBarStyle: {backgroundColor: grey} }}>
      <Tabs.Screen
        name="adapter"
        options={{
          title: 'Adapter',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="speaker-group" color={color} />,
        }}
      />
      <Tabs.Screen
        name="radiosearch"
        options={{
          title: 'Musik',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="library-music" color={color} />
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: 'Einstellungen',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
