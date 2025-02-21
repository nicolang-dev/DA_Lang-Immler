import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import AddToListButton from "./AddToListButton";
import ConnectionItem from "./ConnectionItem";
import Connection from "@/types/Connection";

type Props = {
  connectionList: Connection[];
  onItemPress: Function;
};

export default function ConnectionList({ connectionList, onItemPress }: Props) {
  const style = StyleSheet.create({
    container: {
      width: "95%",
      alignSelf: "center",
      marginTop: 10
    },
    icon: {
      alignSelf: "flex-start",
    },
  });

  if (connectionList.length > 0) {
    return (
      <View style={style.container}>
        <FlatList
          data={connectionList}
          renderItem={({ item }) => (
            <Pressable onPress={() => onItemPress(item)}>
              <ConnectionItem connection={item} />
            </Pressable>
          )}
        />
        <AddToListButton
          onPress={() => router.push("/(tabs)/connection/addConnection")}
        />
      </View>
    );
  } else {
    return (
      <ErrorScreen
        errorText="Es sind zurzeit keine Verbindungen vorhanden!"
        buttonText="Verbindung erstellen"
        onButtonPress={() => router.push("/(tabs)/connection/addConnection")}
      />
    );
  }
}
