const express = require("express");
const bonjour = require("bonjour")();

const app = express();

const mac = "02:1A:6B:4C:D7:9F";
let name = "msa_79f";
let volume = 20;
let battery = 60;
let streamUrl = "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service";
let paused = false;

app.get("/", (req, res) => {
    res.sendStatus(200);
})

app.get("/getAvailableNetworks", (req, res) => {
    const networks = [{"ssid":"Network-1","rssi":-68},{"ssid":"Network-2","rssi":-88},{"ssid":"Network-3","rssi":-93}];
    const data = JSON.stringify(networks);
    res.send(data);
})

app.get("/getInfo", (req, res) => {
   const info = {name: name, mac: mac, volume: volume, battery: battery, station: "example_station_url"};
   res.send(info);
})

app.get("/getStreamUrl", (req, res) => {
    res.send(streamUrl);
})

app.post("/setConfigData", (req,res) => {
    const params = req.query;
    name = params.name;
    res.sendStatus(201);
})

app.put("/setVolume", (req, res) => {
    const params = req.query;
    volume = params.volume;
    res.sendStatus(200);
    console.log("volume: ", volume);
})

app.put("/setStreamUrl", (req, res) => {
    const params = req.query;
    streamUrl = params.streamUrl;
    res.sendStatus(200);
    console.log("stream url: ", streamUrl);
})

app.put("/setPaused", (req, res) => {
    const params = req.query;
    console.log(params);
    paused = params.paused;
    res.sendStatus(200);
    console.log("paused: ", paused);
})

app.listen(80, ()=>{
    console.log("listening!");
})
const host = name + ".local";
bonjour.publish({name: name, type: 'http', port: 80, host: host});

