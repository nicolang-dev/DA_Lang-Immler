import axios from "axios";
import Station from "@/components/Station";
import { Memory } from "@/components/Utilities";

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
            resp.data.map((val: any, idx: number) => {
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
