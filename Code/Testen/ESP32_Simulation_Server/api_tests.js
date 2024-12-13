const axios = require("axios");

const serverUrl = "http://localhost";

async function volumeChangeTest(){
    let url = serverUrl + "/setVolume";
    const volume = 70;
    const data = {volume: volume};
    axios.put(url, data).then(res => {
        url = serverUrl + "/getInfo";
        axios.get(url).then(res => {
            let pro = new Promise();
            return res.data.volume == volume;
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

const data = {volume: 70};
axios.put("http://localhost/setVolume", data);