class Adapter{
    express = require("express");
    bonjour = require("bonjour")();
    app = express();

    mac = "02:1A:6B:4C:D7:9F";
    name = "msa_79f";
    volume = 20;
    battery = 60;
    streamUrl = "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service";
    paused = false;
    url;

    constructor(mac, name){
        this.mac = mac;
        this.name = name;
    }

    start(){
        let url = "/" + this.name;
        app.get(url + "/", (req, res) => {
            res.sendStatus(200);
        })
    
        app.get(url + "/getAvailableNetworks", (req, res) => {
            const networks = [{"ssid":"Network-1","rssi":-68},{"ssid":"Network-2","rssi":-88},{"ssid":"Network-3","rssi":-93}];
            const data = JSON.stringify(networks);
            res.send(data);
        })
    
        app.get(url + "/getInfo", (req, res) => {
        const info = {name: name, mac: mac, volume: volume, battery: battery, station: "example_station_url"};
        res.send(info);
        })
    
        app.get(url + "/getStreamUrl", (req, res) => {
            res.send(streamUrl);
        })
    
        app.post(url + "/setConfigData", (req,res) => {
            const params = req.query;
            name = params.name;
            res.sendStatus(201);
        })
    
        app.put(url + "/setVolume", (req, res) => {
            const params = req.query;
            volume = params.volume;
            res.sendStatus(200);
            console.log("volume: ", volume);
        })
    
        app.put(url + "/setStreamUrl", (req, res) => {
            const params = req.query;
            streamUrl = params.streamUrl;
            res.sendStatus(200);
            console.log("stream url: ", streamUrl);
        })
    
        app.put(url + "/setPaused", (req, res) => {
            const params = req.query;
            console.log(params);
            paused = params.paused;
            res.sendStatus(200);
            console.log("paused: ", paused);
        })
    
        app.listen(80, ()=>{
            console.log("listening!");
        })
        const host = this.name + ".local";
        bonjour.publish({name: this.name, type: 'http', port: 80, host: host});
    }
}