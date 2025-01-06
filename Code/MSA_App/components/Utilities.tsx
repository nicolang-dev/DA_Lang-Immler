import axios from "axios";
import Station from "../app/models/Station";
import Adapter from "../app/models/Adapter";
import Connection from "../app/models/Connection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";

export const RadioBrowserAPI = {
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
    async getAllAdapters(): Promise<Adapter[]|null>{
        const savedAdapters = await AsyncStorage.getItem(adaptersKey);
        if(savedAdapters !== null){
            const adapterList: [] = JSON.parse(savedAdapters);
            const allAdapters: Adapter[] = [];
            adapterList.forEach((element) => {
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
        let newAdapterList = await Memory.getAllAdapters();
        if(newAdapterList === null){
            newAdapterList = [];
        }
        newAdapterList.push(adapter);
        return AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
    },
    async removeAdapter(mac: string){
        let newAdapterList = await Memory.getAllAdapters();
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
        const adapterList = await Memory.getAllAdapters();
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
    clearAdapterList(){
        AsyncStorage.setItem(adaptersKey, "");
    },
    async getAvailableAdapters(): Promise<Adapter[]|null>{
        let result: Adapter[] = [];
        const allAdapters = await Memory.getAllAdapters();
        const connections = await Memory.getConnections();
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

export const AdapterAPI = {   
    async getInfo(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/getInfo";
        axios.get(url).then(res => {
            return res.data;
        })
    },
    async sendConfigData(adapterName: string, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = "http://" + adapterName + ".local:8080/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        return axios.post(url, data);
    },
    async sendVolume(adapterName: String, volume: number){
        const url = "http://" + adapterName + ".local:8080/setVolume";
        const data = "volume=" + volume;
        return axios.put(url, data);
    },
    async sendStreamUrl(adapterName: string, streamUrl: string){
        const url = "http://" + adapterName + ".local:8080/setStreamUrl";
        const data = "url=" + streamUrl;
        console.log("data: ", data);
        return axios.put(url, data);
    },
    async sendPauseStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/pauseStream";
        return axios.post(url);
    },
    async sendContinueStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/continueStream";
        return axios.post(url);
    }
}