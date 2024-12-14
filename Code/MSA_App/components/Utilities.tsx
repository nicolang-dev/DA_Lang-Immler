import axios from "axios";
import Station from "./Station";
import Adapter from "./Adapter";
import Connection from "./Connection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favouriteStationsKey = "favouriteStations";
const adaptersKey = "adapters";

export async function getCountries(): Promise<String []|null>{
    return axios.get("https://de1.api.radio-browser.info/json/countries?order=stationcount&reverse=true&limit=50").then(resp => {
        const countries = resp.data;
        const countryNames: String[] = [];
        for(let country of countries){
            countryNames.push(country.name);
        }
        const sortedCountryNames = countryNames.sort();
        return sortedCountryNames;
    }).catch(err => {
        console.error(err);
        return null;
    })
}

export async function getLanguages(): Promise<String []|null>{
    return axios.get("https://de1.api.radio-browser.info/json/languages?order=stationcount&reverse=true&limit=20").then(resp => {
        const languages = resp.data;
        const languageNames: String[] = [];
        for(let language of languages){
            languageNames.push(language.name);
        }
        const sortedLanguageNames = languageNames.sort();
        const bigSortedLanguageNames: String[] = [];
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
}

export async function getStations(country: string, language:string, maxStations: number): Promise<Station[]|null>{
    const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language.toLowerCase() + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
    return axios.get(stationsUrl).then(resp => {
        const result: Station[] = [];
        resp.data.map((val, idx) => {
            const station = new Station(val.stationuuid, val.name, val.favicon, val.url);
            result.push(station);
        })
        return result;
    }).catch(err => {
        console.error(err);
        return null;
    });
}

export async function getFavouriteStations(): Promise<Station[]|null>{
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
}

export async function addFavouriteStations(stations: Station[]): Promise<boolean>{
    let stationList = await getFavouriteStations();
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
}

export async function removeFavouriteStation(uuid: string): Promise<boolean>{
    let stationList = await getFavouriteStations();
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
}

export function clearFavouriteStationList(){
    AsyncStorage.setItem(favouriteStationsKey, "");
}

export async function getAdapters(): Promise<Adapter[]|null>{
    const savedAdapters = await AsyncStorage.getItem(adaptersKey);
        if(savedAdapters !== null){
            const adapterList: [] = JSON.parse(savedAdapters);
            let result: Adapter[] = [];
            adapterList.forEach((adapter: Adapter) => {
                const url = "http://" + adapter.name + ".local/getInfo";
                const instance = axios.create({timeout: 2500});
                instance.get(url).then(res => {
                    if(res !== undefined){
                        const adapterInfo = res.data;
                        result.push(new Adapter(adapter.name, adapter.mac, adapterInfo.volume, adapterInfo.battery, true, adapterInfo.streamUrl));
                    } else {
                        result.push(new Adapter(adapter.name, adapter.mac, -1, -1, false, ""));
                    }
                })
                if(result.length > 0){
                    return result;
                }
            })
        }
    return null;
}

export async function addAdapter(adapter: Adapter): Promise<boolean>{
    let newAdapterList = await getAdapters();
    if(newAdapterList === null){
        newAdapterList = [];
    }
    newAdapterList.push(adapter);
    await AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
    return true;
}

export async function removeAdapter(mac: string): Promise<boolean>{
    let newAdapterList = await getAdapters();
    if(newAdapterList !== null){
        for(let i = 0; i < newAdapterList.length; i++){
            if(newAdapterList[i].mac == mac){
                newAdapterList.splice(i, 1);
            }
        }
        await AsyncStorage.setItem(adaptersKey, JSON.stringify(newAdapterList));
        return true;
    } else {
        return false;
    }
}

export async function getConnections(): Promise<Connection[]|null>{
    const connectionList: Connection[] = [];
    const adapterList = await getAdapters();
        if(adapterList !== null){
            for(let adapter of adapterList){
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
    return null;
}

export function clearAdapterList(){
    AsyncStorage.setItem(adaptersKey, "");
}

export function sendWlanCredentials(ssid: string, password: string, serverUrl: string){
    const url = serverUrl + "/setWlanCredentials";
    const data = "ssid=" + ssid + "&password=" + password;
    axios.post(url, data);
}