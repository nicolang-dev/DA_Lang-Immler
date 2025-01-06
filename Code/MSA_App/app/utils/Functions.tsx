import axios from "axios";
import Connection from "@/components/Connection";
import Adapter from "@/components/Adapter";
import Station from "@/components/Station";
import { MemoryService } from "../services/MemoryService";

export const Functions = {
    async getConnections(): Promise<Connection[]|null>{
        const connectionList: Connection[] = [];
        const adapterList = await MemoryService.getAllAdapters();
            if(adapterList !== null){
                for(let adapter of adapterList){
                    console.log(adapter);
                    if(adapter.connected && (adapter.streamUrl.length > 0)){
                        const url = "http://de1.api.radio-browser.info/json/stations/byurl?url=" + adapter.streamUrl;
                        const apiRes = await axios.get(url);
                        const obj = apiRes.data[0];
                        if(obj !== undefined){
                            const station = new Station(obj.stationuuid, obj.name, obj.favicon, obj.url);
                            const connection = new Connection(adapter, station);
                            console.log(connection);
                            connectionList.push(connection);
                        }
                    }
                }
                if(connectionList.length > 0){
                    return Promise.resolve(connectionList);
                }
                return Promise.resolve(null);
            }   
        return Promise.resolve(null);
    },
    async getAvailableAdapters(): Promise<Adapter[]|null>{
        let result: Adapter[] = [];
        const allAdapters = await MemoryService.getAllAdapters();
        const connections = await Functions.getConnections();
        if(allAdapters !== null && allAdapters.length > 0){
            if(connections !== null && connections.length > 0){
                const usedAdapterMacs: String[] = [];
                for(let connection of connections){
                    usedAdapterMacs.push(connection.adapter.mac);
                }
                for(let adapter of allAdapters){
                    if(adapter.connected && !usedAdapterMacs.includes(adapter.mac)){
                        result.push(adapter);
                    }
                }
            } else {
                for(let adapter of allAdapters){
                    if(adapter.connected){
                        result.push(adapter);
                    }
                }
            }
            return Promise.resolve(result);
        } else {
            return Promise.resolve(null);
        }
    }
}