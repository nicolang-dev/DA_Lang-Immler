import AsyncStorage from "@react-native-async-storage/async-storage";
import Station from "@/components/Station";
import Adapter from "@/components/Adapter";
import axios from "axios";

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
 
export const MemoryService = {
    async getFavouriteStations(): Promise<Station[]|null>{
        const favouriteStations = await AsyncStorage.getItem(favouriteStationsKey);
        if(favouriteStations != null){
            const stationList = JSON.parse(favouriteStations);
            let result: Station[] = [];
            for(let station of stationList){
                result.push(new Station(station.uuid, station.name, station.iconUrl, station.url));
            }
            return result;
        } else {
            return null;
        }
    },
    async addFavouriteStations(stations: Station[]): Promise<boolean>{
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
        await AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
        return true;
    },
    async removeFavouriteStation(uuid: string): Promise<boolean>{
        let stationList = await MemoryService.getFavouriteStations();
        if(stationList !== null){
            for(let i = 0; i < stationList.length; i++){
                if(stationList[i].uuid == uuid){
                    stationList.splice(i, 1);
                }
            }
            await AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
            return true;
        } 
        return false;
    },
    clearFavouriteStationList(){
        AsyncStorage.setItem(favouriteStationsKey, "");
    },
    async getAllAdapters(): Promise<Adapter[]|null>{
        const savedAdapters = await AsyncStorage.getItem(adaptersKey);
        if(savedAdapters !== null){
            const adapterList: [] = JSON.parse(savedAdapters);
            const allAdapters: Adapter[] = [];
            adapterList.forEach((element: AdapterType) => {
                allAdapters.push(new Adapter(element.name, element.mac, element.volume, element.battery, element.connected, element.streamUrl));
            })
            const promiseList: any[] = [];
            adapterList.forEach((adapter: Adapter) => {
                const url = "http://" + adapter.name + ".local:8080/getInfo";
                //const instance = axios.create({timeout: 2500});
                const promise = axios.get(url, {timeout: 1000});
                promiseList.push(promise);
            })
            const results = await Promise.allSettled(promiseList);
            const reachableAdapters: Adapter[] = [];
            results.forEach((element) => {
                if(element.status == "fulfilled"){
                    const val = element.value.data;
                    reachableAdapters.push(new Adapter(val.name, val.mac, val.volume, val.battery, true, val.stationUrl));
                }
            })
            for(let i = 0; i < allAdapters.length; i++){
                for(let j = 0; j < reachableAdapters.length; j++){
                    if(allAdapters[i].mac == reachableAdapters[j].mac){
                        allAdapters[i] = reachableAdapters[j];
                    }
                }
            }
            return Promise.resolve(allAdapters);
        }
        return Promise.resolve(null);
    },
    async addAdapter(adapter: Adapter){
        let newAdapterList = await MemoryService.getAllAdapters();
        if(newAdapterList === null){
            newAdapterList = [];
        }
        newAdapterList.push(adapter);
        return AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
    },
    async removeAdapter(mac: string){
        let newAdapterList = await MemoryService.getAllAdapters();
        if(newAdapterList !== null){
            for(let i = 0; i < newAdapterList.length; i++){
                if(newAdapterList[i].mac == mac){
                    newAdapterList.splice(i, 1);
                }
            }
            await AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
            return Promise.resolve();
        } else {
            return Promise.reject("adapter list is empty");
        }
    },
    clearAdapterList(){
        AsyncStorage.setItem(adaptersKey, "");
    }
}