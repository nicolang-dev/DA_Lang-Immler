import AsyncStorage from "@react-native-async-storage/async-storage";
import Station from "@/app/types/Station";
import Adapter from "@/app/types/Adapter";
import { AdapterAPI } from "../api/AdapterAPI";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";

type AdapterType = {
    name: string,
    mac: string,
    volume: number,
    battery: number,
    connected: boolean,
    streamUrl: string
}

type StationType = {
    uuid: string,
    name: string,
    iconUrl: string,
    url: string,
}
 
export const MemoryService = {
    async getFavouriteStations(): Promise<Station[]| null>{
        try{
        
            const favouriteStations = await AsyncStorage.getItem(favouriteStationsKey);
            if(favouriteStations !== null){
                return JSON.parse(favouriteStations);
            } else{
                return null;
            }
        } catch(err) {
            throw err;
        }
    },
    async addFavouriteStations(stations: Station[]): Promise<void>{
        let stationList = await MemoryService.getFavouriteStations();
        let existingUuidList: string[] = [];
        stationList?.forEach((station) => {
            existingUuidList.push(station.uuid);
        })
        if(stationList === null){
            stationList = [];
        } 
        for(let station of stations){
            if(!existingUuidList.includes(station.uuid)){
                stationList.push(station);
            }
        }
        try{
            return AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
        } catch(err) {
            throw err;
        }
    },
    async removeFavouriteStation(uuid: string): Promise<void>{
        let stationList = await MemoryService.getFavouriteStations();
        if(stationList !== null){
            for(let i = 0; i < stationList.length; i++){
                if(stationList[i].uuid == uuid){
                    stationList.splice(i, 1);
                }
            }
            try{
                return AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
            } catch(err) {
                throw err;
            }
        } 
    },
    async clearFavouriteStationList(): Promise<void>{
        try{
            return AsyncStorage.setItem(favouriteStationsKey, "");
        } catch(err) {
            throw err;
        }
    },
    async getAllAdapters(): Promise<Adapter[]|null>{
        try{
            const adapters = await AsyncStorage.getItem(adaptersKey);
            let adapterList: Adapter[] = [];
            if(adapters !== null){
                adapterList = JSON.parse(adapters);
            }
            if(adapterList.length > 0){
                const promiseList = [];
                for(let adapter of adapterList){
                    const promise = AdapterAPI.getInfo(adapter.name);
                    promiseList.push(promise);
                }
                const results = await Promise.allSettled(promiseList);
                for(let result of results){
                    if(result.status == "fulfilled"){
                        const info = result.value;
                        for(let adapter of adapterList){
                            if(adapter.name == info.name){
                                adapter.battery = info.battery;
                                adapter.volume = info.volume;
                                adapter.streamUrl = info.stationUrl;
                                adapter.connected = true;
                            } 
                        }
                    }
                }
                return adapterList;
            }
            return null;
        } catch(err) {
            console.error(err);
            throw err;
        }
    },
    async addAdapter(adapter: Adapter): Promise<void>{
        let newAdapterList = await MemoryService.getAllAdapters();
        if(newAdapterList === null){
            newAdapterList = [];
        }
        newAdapterList.push(adapter);
        return AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
    },
    async removeAdapter(mac: string): Promise<void>{
        let newAdapterList = await MemoryService.getAllAdapters();
        if(newAdapterList !== null){
            for(let i = 0; i < newAdapterList.length; i++){
                if(newAdapterList[i].mac == mac){
                    newAdapterList.splice(i, 1);
                }
            }
            try{
                return AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
            } catch(err){
                throw err;
            }
        }
    },
    async clearAdapterList(): Promise<void>{
        try{
            return AsyncStorage.setItem(adaptersKey, "");
        } catch(err) {
            throw err;
        }
    }
}