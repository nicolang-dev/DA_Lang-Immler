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
            if(adapters !== null){
                return JSON.parse(adapters);
            } else {
                return null;
            }
        } catch(err) {
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