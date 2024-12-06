const express = require("express");
const bonjour = require("bonjour")();

const app = express();

const mac = "02:1A:6B:4C:D7:9F";
let name = "Adapter1";
let volume = 20;
let battery = 60;

app.get("/", (req, res) => {
    res.send("get request received!");
})

app.get("/getAvailableNetworks", (req, res) => {
    const networks = [{"ssid":"Network-1","rssi":-68},{"ssid":"Network-2","rssi":-88},{"ssid":"Network-3","rssi":-93}];
    const data = JSON.stringify(networks);
    res.send(data);
})

app.get("/test", (req, res) => {
    setTimeout(() => {
        res.send("this is the response");
    }, 5000);
})

app.get("/getInfo", (req, res) => {
   const info = {name: name, mac: mac, volume: volume, battery: battery, station: "example_station_url"};
   res.send(info);
})

app.post("/setName", (req, res) => {
    const params = req.params;
    name = params.name;
    res.send("name received");
    bonjour.publish({name: name, type: 'http', port: 80, host: hostname});
})

app.post("/setVolume", (req, res) => {
    const params = req.params;
    volume = params.volume;
    res.send("volume received");
})

app.listen(80, ()=>{
    console.log("listening!");
})

const hostname = name + ".local"
bonjour.publish({name: name, type: 'http', port: 80, host: hostname});