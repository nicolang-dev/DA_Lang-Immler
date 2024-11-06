const axios = require("axios");

const serverUrl = "http://de1.api.radio-browser.info";

async function getCountries(){
    const url = serverUrl + "/json/countries";
    axios.get(url).then(resp => {
        console.log(resp.data);
        return resp.data;
    }).catch(err => {
        console.error(err);
    })
}

function getLanguages(){
    const url = serverUrl + "/json/languages";
    axios.get(url).then(resp => {
        return resp.data;
    }).catch(err => {
        console.error(err);
    })
}

function getStationsByName(name){
    if(name !== undefined){
        const url = serverUrl + "/json/stations/byname/" + name;
        axios.get(url).then(resp => {
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }
}

function getStationsByCountry(country){
    if(country !== undefined){
        const url = serverUrl + "/json/stations/bycountry/" + country;
        axios.get(url).then(resp => {
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }
}

function getStationsByCountry(language){
    if(language !== undefined){
        const url = serverUrl + "/json/stations/bycountry/" + language;
        axios.get(url).then(resp => {
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }
}
/*
console.log(getCountries());
console.log(getLanguages());
*/

let countries = await getCountries();