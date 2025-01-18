import AsyncStorage from "@react-native-async-storage/async-storage";
import Station from "@/app/types/Station";
import Adapter from "@/app/types/Adapter";
import { AdapterAPI } from "../api/AdapterAPI";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";
const userIdKey = "userId";
 
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
        let stationList = await this.getFavouriteStations();
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
            await AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
            return
        } catch(err) {
            throw err;
        }
    },
    async removeFavouriteStation(uuid: string): Promise<void>{
        let stationList = await this.getFavouriteStations();
        if(stationList !== null){
            for(let i = 0; i < stationList.length; i++){
                if(stationList[i].uuid == uuid){
                    stationList.splice(i, 1);
                }
            }
            try{
                await AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
                return
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
        let newAdapterList = await this.getAllAdapters();
        if(newAdapterList === null){
            newAdapterList = [];
        }
        newAdapterList.push(adapter);
        await AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
        return
    },
    async removeAdapter(mac: string): Promise<void>{
        let newAdapterList = await this.getAllAdapters();
        if(newAdapterList !== null){
            for(let i = 0; i < newAdapterList.length; i++){
                if(newAdapterList[i].mac == mac){
                    newAdapterList.splice(i, 1);
                }
            }
            try{
                await AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
                return
            } catch(err){
                throw err;
            }
        }
    },
    async clearAdapterList(): Promise<void>{
        try{
            await AsyncStorage.setItem(adaptersKey, "");
            return
        } catch(err) {
            throw err;
        }
    },
    async getUserId(): Promise<string | null>{
        try{
            return AsyncStorage.getItem(userIdKey);
        } catch(err){
            throw err;
        }
    },
    async setUserId(userId: string): Promise<void>{
        try{
            await AsyncStorage.setItem(userIdKey, userId);
            return
        } catch(err){
            throw err;
        }
    },
    async deleteUserId(): Promise<void>{
        try{
            await AsyncStorage.removeItem(userIdKey);
            return
        } catch(err){
            throw err;
        }
    }
}