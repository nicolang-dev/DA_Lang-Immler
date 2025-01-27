import axios from "axios";
import Station from "@/types/Station";
import { MemoryService } from "../services/MemoryService";
import Country from "../types/Country";
import Language from "../types/Language";
import { useContext } from "react";

export const RadioBrowserAPI = {
    async getCountryNames(): Promise<Country []>{
        try{
            const res = await axios.get("https://de1.api.radio-browser.info/json/countries?order=stationcount&reverse=true&limit=50");
            const countries = res.data;
            const countryList: Country[] = [];
            for(let country of countries){
                countryList.push({name: country.name, code: country.iso_3166_1});
            }
            const sortedCountries = countryList.sort((a, b) => {
                if(a.name == b.name){
                    return 0;
                } else if(a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return sortedCountries;
        } catch(err) {
            throw err;
        }
    },
    async getLanguageNames(): Promise<Language []>{
        try{
            const res = await axios.get("https://de1.api.radio-browser.info/json/languages?order=stationcount&reverse=true&limit=20");
            const languages = res.data;
            const languageList: Language[] = [];
            for(let language of languages){
                let oldName = language.name;
                let newName = oldName.charAt(0).toUpperCase() + oldName.slice(1);
                if(oldName.includes(' ')){
                    let spaceIdx = newName.indexOf(' ');
                    newName = newName.slice(0, spaceIdx) + ' ' + newName.charAt(spaceIdx+1).toUpperCase() + newName.slice(spaceIdx+2);
                }
                languageList.push({name: newName, code: language.iso_639});
            }
            const sortedLanguages = languageList.sort((a, b) => {
                if(a.name == b.name){
                    return 0;
                } else if(a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return sortedLanguages;
        } catch(err) {
            throw err;
        }
    },
    async getStations(countryName: string, languageName: string, maxStations: number, dontShow: Station[] | null): Promise<Station[]>{
        let url = "http://de1.api.radio-browser.info/json/stations/search?order=clickcount&reverse=true&hidebroken=true&codec=mp3&limit=" + maxStations;
        if(languageName !== null && languageName !== "-"){
            url += "&language=" + languageName.toLowerCase();
        }
        if(countryName !== null && languageName !== "-"){
            url += "&country=" + countryName;
        }
        console.log(url);
        try{
            const stations = await axios.get(url);
            const result: Station[] = [];
            stations.data.forEach((val: any) => {
                if(dontShow !== null){
                    let containsUuid = false;
                    for(let favStation of dontShow){ //check if station is already in favourite stations
                        if(favStation.uuid == val.stationuuid){
                            containsUuid = true;
                        }
                    }
                    if(!containsUuid){
                        const station = {uuid: val.stationuuid, name: val.name, iconUrl: val.favicon, url: val.url};
                        result.push(station);
                    }
                } else {
                    const station = {uuid: val.stationuuid, name: val.name, iconUrl: val.favicon, url: val.url};
                    result.push(station);
                }
            })
            return result;
        } catch(err) {
            throw err;
        }
    },
    async getStationInfo(streamUrl: string){
        const url = "http://de1.api.radio-browser.info/json/stations/byurl?url=" + streamUrl;
        try{
            const apiRes = await axios.get(url);
            return apiRes.data[0];
        } catch(err) {
            throw err;
        }
    }
}
