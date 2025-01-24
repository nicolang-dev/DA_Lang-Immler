import Connection from "@/types/Connection";
import Adapter from "@/types/Adapter";
import Station from "@/types/Station";
import { MemoryService } from "../services/MemoryService";
import { RadioBrowserAPI } from "../api/RadioBrowserAPI";
import { AdapterAPI } from "../api/AdapterAPI";

export const Functions = {
    async getConnections(): Promise<Connection[]|null>{
        const connectionList: Connection[] = [];
        const adapterList = await MemoryService.getAllAdapters();
            if(adapterList !== null){
                for(let adapter of adapterList){
                    if(adapter.connected && (adapter.streamUrl.length > 0)){
                        const staInfo = await RadioBrowserAPI.getStationInfo(adapter.streamUrl);
                        if(staInfo !== undefined){
                            const station: Station = {uuid: staInfo.stationuuid, name: staInfo.name, iconUrl: staInfo.favicon, url: staInfo.url};
                            const connection: Connection = {adapter: adapter, station: station, paused: false};
                            connectionList.push(connection);
                        }
                    }
                }
                if(connectionList.length > 0){
                    return connectionList;
                }
                return null;
            }   
        return null;
    },
    async getAvailableAdapters(): Promise<Adapter[]|null>{
        const allAdapters = await MemoryService.getAllAdapters();
        const availableAdapters: Adapter[] = [];
        const connections = await this.getConnections();
        if(allAdapters !== null){
            for(let adapter of allAdapters){
                console.log("adapter: ", adapter);
                if(connections !== null){
                    let adapterIdx = connections?.findIndex(connection => connection.adapter.name == adapter.name);
                    if(adapterIdx == -1 && adapter.connected){
                        availableAdapters.push(adapter);
                    }
                } else {
                    if(adapter.connected){
                        availableAdapters.push(adapter);
                    }
                }
                
            }
            return availableAdapters;
        }
        return null;
    }
}