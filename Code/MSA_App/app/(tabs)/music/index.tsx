import { SafeAreaView } from "react-native";
import { GlobalStyle } from "@/constants/Style";
import StationList from "@/components/StationList";
import { StationContext } from "@/context/StationContext";
import { useContext } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Station from "@/types/Station";
import { CloudStorage } from "@/api/FirebaseAPI";

export default function MusicScreen() {
  const { stationList, loaded } = useContext(StationContext);

  function deleteStation(selectedStation: Station) {
    let newStationList = [];
    for (let station of stationList) {
      if (!(selectedStation.uuid == station.uuid)) {
        newStationList.push(station);
      }
    }
    CloudStorage.setStationList(newStationList);
  }

  if (loaded) {
    return (
      <SafeAreaView style={GlobalStyle.page}>
        <StationList
          stationList={stationList}
          editable
          onItemSelect={() => {}}
          onDeleteStation={(station: Station) => deleteStation(station)}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={GlobalStyle.page}>
        <LoadingScreen text="Lade Stationen ..." />
      </SafeAreaView>
    );
  }
}
