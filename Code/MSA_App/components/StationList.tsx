import { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import { Alert } from "react-native";
import Station from "@/types/Station";
import StationItem from "./StationItem";

type Props = {
  stationList: Station[];
  onItemSelect: Function;
  onDeleteStation: Function;
  editable: boolean;
};

export default function StationList({
  stationList,
  onItemSelect,
  onDeleteStation,
  editable,
}: Props) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  function handleItemPress(item: Station) {
    if (selectedStation !== null && selectedStation.uuid == item.uuid) {
      setSelectedStation(null);
      onItemSelect(null);
    } else {
      setSelectedStation(item);
      onItemSelect(item);
    }
  }

  function handleDeletePress() {
    if (selectedStation !== null) {
      Alert.alert(
        "Station löschen",
        "Wollen Sie die Station '" +
          selectedStation.name +
          "' wirklich löschen?",
        [
          {
            text: "Nein",
            onPress: () => {
              setSelectedStation(null);
            },
          },
          {
            text: "Ja",
            onPress: () => {
              onDeleteStation(selectedStation);
            },
          },
        ]
      );
    }
  }

  function isSelected(item: Station) {
    if (selectedStation !== null && selectedStation.uuid == item.uuid) {
      return true;
    }
    return false;
  }

  const style = StyleSheet.create({
    container: {
      width: "95%",
      alignSelf: "center",
      marginTop: 10
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

  if (stationList.length > 0) {
    return (
      <View style={style.container}>
        <FlatList
          data={stationList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleItemPress(item);
              }}
            >
              <StationItem station={item} selected={isSelected(item)} />
            </Pressable>
          )}
        />
        {editable && (
          <View style={style.iconContainer}>
            <AddToListButton
              onPress={() => router.push("/music/radiosearch")}
            />
            {selectedStation !== null && (
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
    return (
      <ErrorScreen
        errorText="Du hast noch keine Stationen hinzugefügt!"
        buttonText="Station hinzufügen"
        onButtonPress={() => router.push("/music/radiosearch")}
      />
    );
  }
}