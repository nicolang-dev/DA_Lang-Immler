const axios = require("axios");

async function getStations(country, language, maxStations){
    const stationsUrl = "http://de1.api.radio-browser.info/json/stations/search" + "?language=" + language.toLowerCase() + "&country=" + country + "&order=clickcount&reverse=true&limit=" + maxStations;
    return axios.get(stationsUrl).then(resp => {
        return resp.data;
    }).catch(err => {
        console.error(err);
        return null;
    });
}

getStations("Austria", "german", 1).then(res => {
    console.log(res);
});