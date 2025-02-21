import { SafeAreaView } from "react-native";
import ConnectionList from "@/components/ConnectionList";
import { GlobalStyle } from "@/constants/Style";
import { useContext } from "react";
import { AdapterContext } from "@/context/AdapterContext";
import { useState, useEffect } from "react";
import Connection from "@/types/Connection";
import { RadioBrowserAPI } from "@/api/RadioBrowserAPI";
import Station from "@/types/Station";
import LoadingScreen from "@/components/LoadingScreen";

export default function ConnectionScreen() {
  const [connectionList, setConnectionList] = useState<Connection[]>([]);
  const { adapterList } = useContext(AdapterContext);
  const [loaded, setLoaded] = useState(false);

  function requestConnections() {
    let newConnectionList: Connection[] = [];
    let promiseList = [];
    for (let adapter of adapterList) {
      if (adapter.streamUrl.length > 0) {
        let promise = RadioBrowserAPI.getStationInfo(adapter.streamUrl);
        promiseList.push(promise);
      }
    }
    Promise.allSettled(promiseList).then((resultList) => {
      let stationInfoList = [];
      for (let result of resultList) {
        if (result.status == "fulfilled") {
          stationInfoList.push(result.value);
        }
      }
      for (let adapter of adapterList) {
        if (adapter.streamUrl.length > 0) {
          for (let stationInfo of stationInfoList) {
            if (stationInfo.url == adapter.streamUrl) {
              let station: Station = {
                name: stationInfo.name,
                uuid: stationInfo.stationuuid,
                url: stationInfo.url,
                iconUrl: stationInfo.favicon,
              };
              let connection: Connection = {
                adapter: adapter,
                station: station,
                paused: false,
              };
              newConnectionList.push(connection);
            }
          }
        }
      }
      if (
        JSON.stringify(connectionList) !== JSON.stringify(newConnectionList)
      ) {
        setConnectionList(newConnectionList);
      }
      setLoaded(true);
    });
  }

  useEffect(() => {
    requestConnections();
  }, []);

  useEffect(() => {
    requestConnections();
  }, [adapterList]);

  if (loaded) {
    return (
      <SafeAreaView style={GlobalStyle.page}>
        <ConnectionList
          connectionList={connectionList}
          onItemPress={() => {}}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={GlobalStyle.page}>
        <LoadingScreen text="Lade Verbindungen ..." />
      </SafeAreaView>
    );
  }
}
