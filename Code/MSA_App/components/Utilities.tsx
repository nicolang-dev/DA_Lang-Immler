import axios from "axios";
import Station from "./Station";
import Adapter from "./Adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";

export async function getStations(country: string, language:string, maxStations: number): Promise<Station[]|null>{
    const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
    return axios.get(stationsUrl).then(resp => {
        const result: Station[] = [];
        resp.data.map((val, idx) => {
            const station = new Station(val.id, val.name, val.favicon, val.url);
            result.push(station);
        })
        return result;
    }).catch(err => {
        console.error(err);
        return null;
    });
}

export async function getFavouriteStations(): Promise<Station[]|null>{
    return AsyncStorage.getItem(favouriteStationsKey).then(res => {
        if(res != null){
            const stationList = JSON.parse(res);
            let result: Station[] = [];
            for(let station of stationList){
                result.push(new Station(station.id, station.name, station.iconUrl, station.url));
            }
            return result;
        } else {
            return null;
        }
    })
}

export function addFavouriteStation(station: Station){
    getFavouriteStations().then(res => {
        let stationList: Station[];
        if(res != null){
            stationList = res;
        } else {
            stationList = [];
        }
        stationList?.push(station);
        AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
    })
}

export function removeFavouriteStation(station: Station){
    getFavouriteStations().then(res => {
        const stationList = res;
        if(stationList != null){
            for(let i = 0; i < stationList?.length; i++){
                if(stationList[i].getId() == station.getId()){
                    stationList[i] == null;
                }
            }
            AsyncStorage.setItem(favouriteStationsKey, JSON.stringify(stationList));
        }
    })
}

export function clearFavouriteStationList(){
    AsyncStorage.setItem(favouriteStationsKey, "");
}

export async function getAdapters(): Promise<Adapter[]|null>{
    return AsyncStorage.getItem(adaptersKey).then(res => {
        if(res != null){
            const adapterList = JSON.parse(res);
            let result: Adapter[] = [];
            for(let adapter of adapterList){
                result.push(new Adapter(adapter.id, adapter.name, adapter.mac, adapter.connected, adapter.battery));
            }
            return result;
        } else {
            return null;
        }
    })
}

export function addAdapter(adapter: Adapter){
    getAdapters().then(res => {
        const adapterList = res;
        adapterList?.push(adapter);
        AsyncStorage.setItem(adaptersKey, JSON.stringify(adapterList));
    })
}

export function removeAdapter(adapter: Adapter){
    getAdapters().then(res => {
        const adapterList = res;
        if(adapterList != null){
            for(let i = 0; i < adapterList?.length; i++){
                if(adapterList[i] == adapter){
                    adapterList[i] == null;
                }
            }
            AsyncStorage.setItem(adaptersKey, JSON.stringify(adapterList));
        }
    })
}

export function clearAdapterList(){
    AsyncStorage.setItem(adaptersKey, "");
}