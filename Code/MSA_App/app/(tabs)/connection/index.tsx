import { SafeAreaView } from "react-native"
import ConnectionList from "@/components/ConnectionList";
import { GlobalStyle } from "@/constants/Style";
import { useContext } from "react";
import { AdapterContext } from "@/context/AdapterContext";
import { useState, useEffect } from "react";
import { RadioBrowserAPI } from "@/api/RadioBrowserAPI";
import Connection from "@/types/Connection";

export default function ConnectionScreen(){
    const [connectionList, setConnectionList] = useState<Connection[]>([]);
    const { adapterList } = useContext(AdapterContext);

    useEffect(() => {
        for(let adapter of adapterList){
            if(adapter.connected && adapter.streamUrl.length > 0){
                let newConnectionList: Connection[] = [];
                let stationInfo = RadioBrowserAPI.getStationInfo(adapter.streamUrl);
                let connection: Connection = {adapter: adapter, station: {name: stationInfo.name, uuid: stationInfo.uuid, url: stationInfo.url, iconUrl: stationInfo.favicon}, paused: true};
                newConnectionList.push(connection);
                setConnectionList(newConnectionList);
            }
        }
    }, [adapterList]);

    return (
        <SafeAreaView style={GlobalStyle.page}>
            <ConnectionList connectionList={connectionList} onItemPress={()=>{}}/>
        </SafeAreaView>
    );
}