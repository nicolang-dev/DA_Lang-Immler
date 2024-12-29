import axios from "axios";
import Station from "./Station";
import Adapter from "./Adapter";
import Connection from "./Connection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";

export const RadioBrowser = {
    async getCountries(): Promise<string []|null>{
        return axios.get("https://de1.api.radio-browser.info/json/countries?order=stationcount&reverse=true&limit=50").then(resp => {
            const countries = resp.data;
            const countryNames: string[] = [];
            for(let country of countries){
                countryNames.push(country.name);
            }
            const sortedCountryNames = countryNames.sort();
            return sortedCountryNames;
        }).catch(err => {
            console.error(err);
            return null;
        })
    },
    async getLanguages(): Promise<string []|null>{
        return axios.get("https://de1.api.radio-browser.info/json/languages?order=stationcount&reverse=true&limit=20").then(resp => {
            const languages = resp.data;
            const languageNames: string[] = [];
            for(let language of languages){
                languageNames.push(language.name);
            }
            const sortedLanguageNames = languageNames.sort();
            const bigSortedLanguageNames: string[] = [];
            for(let name of sortedLanguageNames){
                let newName = name.charAt(0).toUpperCase() + name.slice(1);
                if(name.includes(' ')){
                    let spaceIdx = newName.indexOf(' ');
                    newName = newName.slice(0, spaceIdx) + ' ' + newName.charAt(spaceIdx+1).toUpperCase() + newName.slice(spaceIdx+2);
                }
                bigSortedLanguageNames.push(newName);
            }
            return bigSortedLanguageNames;
        }).catch(err => {
            console.error(err);
            return null;
        })
    },
    async getStations(country: string, language:string, maxStations: number): Promise<Station[]|null>{
        const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language.toLowerCase() + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
        const favouriteStations = await Memory.getFavouriteStations();
        return axios.get(stationsUrl).then(resp => {
            const result: Station[] = [];
            resp.data.map((val, idx) => {
                if(favouriteStations !== null){
                    let containsUuid = false;
                    for(let favStation of favouriteStations){ //check if station is already in favourite stations
                        if(favStation.uuid == val.stationuuid){
                            containsUuid = true;
                        }
                    }
                    if(!containsUuid){
                        const station = new Station(val.stationuuid, val.name, val.favicon, val.url);
                        result.push(station);
                    }
                } else {
                    const station = new Station(val.stationuuid, val.name, val.favicon, val.url);
                    result.push(station);
                }
            })
            return result;
        }).catch(err => {
            console.error(err);
            return null;
        });
    }
}

export const Memory = {
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
        let stationList = await Memory.getFavouriteStations();
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
        let stationList = await Memory.getFavouriteStations();
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
    async getAdapters(): Promise<Adapter[]|null>{
        const savedAdapters = await AsyncStorage.getItem(adaptersKey);
        if(savedAdapters !== null){
            const reachableAdapters: Adapter[] = [];
            const unreachableAdapters: Adapter[] = [];
            const adapterList: [] = JSON.parse(savedAdapters);
            adapterList.forEach((element) => {
                unreachableAdapters.push(new Adapter(element.name, element.mac, -1, -1, false, ""));
            })
            const promiseList: any[] = [];
            adapterList.forEach((adapter: Adapter) => {
                const url = "http://" + adapter.name + ".local/getInfo";
                const instance = axios.create({timeout: 500});
                const promise = instance.get(url);
                promiseList.push(promise);
            })
            const results = await Promise.allSettled(promiseList);
            results.forEach((element) => {
                if(element.status == "fulfilled"){
                    const val = element.value.data;
                    reachableAdapters.push(new Adapter(val.name, val.mac, val.volume, val.battery, true, val.streamUrl));
                }
            })
            for(let i = 0; i < unreachableAdapters.length; i++){
                for(let j = 0; j < reachableAdapters.length; j++){
                    if(unreachableAdapters[i].mac == reachableAdapters[j].mac){
                        unreachableAdapters.splice(i, 1);
                    }
                }
            }
            const result = reachableAdapters.concat(unreachableAdapters);
            return Promise.resolve(result);
        }
        return Promise.reject("no adapters available");
    },
    async addAdapter(adapter: Adapter){
        let newAdapterList = await Memory.getAdapters();
        if(newAdapterList === null){
            newAdapterList = [];
        }
        newAdapterList.push(adapter);
        return AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
    },
    async removeAdapter(mac: string){
        let newAdapterList = await Memory.getAdapters();
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
    async getConnections(): Promise<Connection[]|null>{
        const connectionList: Connection[] = [];
        const adapterList = await Memory.getAdapters();
            if(adapterList !== null){
                for(let adapter of adapterList){
                    if(adapter.connected){
                        const instance = axios.create({timeout: 2500});
                        let url = "http://" + adapter.name + ".local/getStreamUrl";
                        const adapterRes = await instance.get(url);
                        url = "http://de1.api.radio-browser.info/json/stations/byurl?url=" + adapterRes.data;
                        const apiRes = await instance.get(url);
                        const obj = apiRes.data[0];
                        const station = new Station(obj.stationuuid, obj.name, obj.favicon, obj.url);
                        const connection = new Connection(adapter, station);
                        connectionList.push(connection);
                        if(connectionList.length > 0){
                            return connectionList;
                        } else {
                            return null;
                        }
                    }
                }
            }
        return null;
    },
    clearAdapterList(){
        AsyncStorage.setItem(adaptersKey, "");
    },

}

export const AdapterAPI = {   
    async getInfo(adapterName: string){
        const url = "http://" + adapterName + ".local/getInfo";
        return axios.get(url);
    },
    sendConfigData(adapterName: string, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = "http://" + adapterName + ".local/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        axios.post(url, data);
    },
    sendVolume(adapterName: String, volume: number){
        const url = "http://" + adapterName + ".local/setVolume";
        const data = "volume=" + volume;
        axios.post(url, data);
    }
}


