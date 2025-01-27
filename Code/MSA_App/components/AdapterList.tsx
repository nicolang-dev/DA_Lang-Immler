import { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import Adapter from "../types/Adapter";
import AdapterItem from "./AdapterItem";
import { Alert } from "react-native";
import { AdapterContext } from "@/context/AdapterContext";
import { CloudStorage } from "@/api/FirebaseAPI";

type Props = {
  onItemSelect: Function;
  editable: boolean;
  showOnlyAvailable: boolean;
};

export default function AdapterList({
  onItemSelect,
  editable,
  showOnlyAvailable,
}: Props) {
  const [selectedAdapter, setSelectedAdapter] = useState<Adapter | null>(null);
  const { adapterList, reachableAdapterMacs } = useContext(AdapterContext);

  function handleItemPress(item: Adapter) {
    if (selectedAdapter !== null && selectedAdapter.mac == item.mac) {
      setSelectedAdapter(null);
      onItemSelect(null);
    } else {
      setSelectedAdapter(item);
      onItemSelect(item);
    }
  }

  function deleteItem() {
    if (selectedAdapter !== null && adapterList.length > 0) {
      let newAdapterList = [...adapterList];
      for (let i = 0; i < newAdapterList.length; i++) {
        if (newAdapterList[i].mac == selectedAdapter.mac) {
          newAdapterList.splice(i, 1);
          break;
        }
      }
      if (newAdapterList.length > 0) {
        CloudStorage.setAdapterList(newAdapterList);
        console.log("new adapterlist:", newAdapterList);
      } else {
        console.log("new adapterlist:", []);
        CloudStorage.setAdapterList([]);
      }
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
              deleteItem();
            },
          },
        ]
      );
    }
  }

  function isSelected(item: Adapter) {
    if (selectedAdapter !== null && selectedAdapter.mac == item.mac) {
      if ((showOnlyAvailable && (reachableAdapterMacs.includes(item.mac))) || !showOnlyAvailable) {
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
              <AdapterItem adapter={item} selected={isSelected(item)} reachable={reachableAdapterMacs.includes(item.mac)}/>
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
    if (showOnlyAvailable) {
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