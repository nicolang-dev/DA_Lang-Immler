import { useContext, useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import StationItem from "@/components/StationItem";
import Station from "@/types/Station";
import { router } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteButton from "./DeleteButton";
import AddToListButton from "./AddToListButton";
import { Alert } from "react-native";
import { StationContext } from "@/context/StationContext";
import { CloudStorage } from "@/api/FirebaseAPI";

type Props = {
  onItemSelect: Function;
  editable: boolean;
};

export default function StationList({ onItemSelect, editable }: Props) {
  const { stationList } = useContext(StationContext);
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

  function deleteItem() {
    if(selectedStation !== null && stationList.length > 0) {
        let newStationList = [... stationList];
        for(let i = 0; i < newStationList.length; i++){
            if(newStationList[i].uuid == selectedStation.uuid){
                newStationList.splice(i, 1);
                break;
            }
        }
        if(newStationList.length !== 0){
            CloudStorage.setStationList(newStationList);
        } else{
            CloudStorage.setStationList([]);
        }
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
              deleteItem();
            },
          },
        ]
      );
    }
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

  if(stationList.length > 0) {
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
              <StationItem
                station={item}
                selected={
                  selectedStation !== null && selectedStation.uuid == item.uuid
                }
              />
            </Pressable>
          )}
        />
        {editable && (
          <View style={style.iconContainer}>
            <AddToListButton
              onPress={() =>
                router.push("/(tabs)/music/radiosearch", {
                  relativeToDirectory: true,
                })
              }
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
      <SafeAreaView style={GlobalStyle.page}>
        <ErrorScreen
          errorText="Du hast noch keine Stationen hinzugefügt!"
          buttonText="Station hinzufügen"
          onButtonPress={() => router.push("/(tabs)/music/radiosearch")}
        />
      </SafeAreaView>
    );
  }
}
