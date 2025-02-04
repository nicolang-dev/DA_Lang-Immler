import { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import AdapterItem from "./AdapterItem";
import { Alert } from "react-native";
import AdapterData from "@/types/AdapterData";

type Props = {
  adapterList: AdapterData[];
  onItemSelect: Function;
  onDeleteAdapter: Function;
  editable: boolean;
  showOnlyAvailable: boolean;
};

export default function AdapterList({
  adapterList,
  onItemSelect,
  onDeleteAdapter,
  editable,
  showOnlyAvailable,
}: Props) {
  const [selectedAdapter, setSelectedAdapter] = useState<AdapterData | null>(null);

  function handleItemPress(item: AdapterData) {
    if (selectedAdapter !== null && selectedAdapter.mac == item.mac) {
      setSelectedAdapter(null);
      onItemSelect(null);
    } else {
      setSelectedAdapter(item);
      onItemSelect(item);
    }
  }

  function handleDeletePress() {
    if (selectedAdapter !== null) {
      Alert.alert(
        "Adapter löschen",
        "Wollen Sie den Adapter '" +
          selectedAdapter.name +
          "' wirklich löschen?",
        [
          {
            text: "Nein",
            onPress: () => {
              setSelectedAdapter(null);
            },
          },
          {
            text: "Ja",
            onPress: () => {
              onDeleteAdapter(selectedAdapter);
            },
          },
        ]
      );
    }
  }

  function isSelected(item: AdapterData) {
    if (selectedAdapter !== null && selectedAdapter.mac == item.mac) {
      if ((showOnlyAvailable && item.connected) || !showOnlyAvailable) {
        return true;
      }
    }
    return false;
  }

  const style = StyleSheet.create({
    container: {
      width: "95%",
      alignSelf: "center",
    },
    icon: {
      alignSelf: "flex-start",
    },
    iconContainer: {
      flexDirection: "row",
      width: "95%",
      justifyContent: "space-between",
      alignSelf: "center",
    },
  });

  if (adapterList.length > 0) {
    return (
      <View style={style.container}>
        <FlatList
          data={adapterList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleItemPress(item);
              }}
            >
              <AdapterItem adapter={item} selected={isSelected(item)} reachable={item.connected}/>
            </Pressable>
          )}
        />
        {editable && (
          <View style={style.iconContainer}>
            <AddToListButton
              onPress={() => router.push("/(tabs)/adapter/addAdapter")}
            />
            {selectedAdapter !== null && (
              <DeleteButton
                onPress={() => {
                  handleDeletePress();
                }}
              />
            )}
          </View>
        )}
      </View>
    );
  } else {
    if(showOnlyAvailable) {
      return (
        <ErrorScreen
          errorText="Kein Adapter verfügbar!"
          buttonText="Neuen Adapter hinzufügen"
          onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}
        />
      );
    } else {
      return (
        <ErrorScreen
          errorText="Du hast noch keine Adapter hinzugefügt!"
          buttonText="Adapter hinzufügen"
          onButtonPress={() => router.push("/(tabs)/adapter/addAdapter")}
        />
      );
    }
  }
}