import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Style";
import AdapterItem from "./AdapterItem";
import StationItem from "./StationItem";
import Connection from "../types/Connection";
import PlayPauseButton from "./PlayPauseButton";
import VolumeSelector from "./VolumeSelector";
import { AdapterAPI } from "@/api/AdapterAPI";
import DisconnectButton from "./DisconnectButton";
import { useState } from "react";

type Props = {
  connection: Connection;
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 20,
    marginBottom: 7,
  },
  controlElementContainer: {
    alignItems: "center",
  },
});

function endConnection(connection: Connection) {
  AdapterAPI.sendStreamUrl(connection.adapter.mac, "").then(() => {
    console.log("connection ended");
    AdapterAPI.sendPauseStream(connection.adapter.mac).then(() => {
      console.log("stream paused");
    })
  })
}

export default function ConnectionItem({ connection }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <View style={style.container}>
      <DisconnectButton
        onDisconnect={() => endConnection(connection)}
        active={!loading}
      />
      <AdapterItem adapter={connection.adapter} selected={false} />
      <StationItem station={connection.station} selected={false} />
      <View style={style.controlElementContainer}>
        <PlayPauseButton
          paused={connection.paused}
          active={!loading}
          onPress={() => {
            setLoading(true);
            if(connection.paused) {
              console.log("connection paused: ", connection.paused);
              AdapterAPI.sendContinueStream(connection.adapter.mac)
                .then(() => {
                  setLoading(false);
                  connection.paused = false;
                })
                .catch((err) => {
                  console.error(err);
                  setLoading(false);
                });
            } else {
              AdapterAPI.sendPauseStream(connection.adapter.mac)
                .then(() => {
                  setLoading(false);
                  connection.paused = true;
                })
                .catch((err) => {
                  console.error(err);
                  setLoading(false);
                });
            }
          }}
        />
        <VolumeSelector
          active={!loading}
          initVolumePercentage={connection.adapter.volume}
          onValueChange={(val: number) => {
            setLoading(true);
            AdapterAPI.sendVolume(connection.adapter.mac, val).then(() => {
              setLoading(false);
            }).catch(err => {
              console.error(err);
              setLoading(false);
            });
          }}
        />
      </View>
    </View>
  );
}
