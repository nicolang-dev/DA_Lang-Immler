import Connection from "@/app/types/Connection";
import Adapter from "@/app/types/Adapter";
import Station from "@/app/types/Station";
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
        if(allAdapters !== null){
            const promiseList: any[] = [];
            for(let adapter of allAdapters){
                const promise = AdapterAPI.getInfo(adapter.name);
                promiseList.push(promise);
            }
            const results = await Promise.allSettled(promiseList);
            const reachableAdapters: Adapter[] = [];
            for(let result of results){
                if(result.status == "fulfilled"){
                    const val = result.value.data;
                    reachableAdapters.push({name: val.name, mac: val.mac, volume: val.volume, battery: val.battery, connected: true, streamUrl: val.stationUrl});
                }
            }
            for(let i = 0; i < allAdapters.length; i++){
                for(let j = 0; j < reachableAdapters.length; j++){
                    if(allAdapters[i].mac == reachableAdapters[j].mac){
                        allAdapters[i] = reachableAdapters[j];
                    }
                }
            }
            return allAdapters;
        }
        return null;
    }
}