const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("get request received!");
})

app.get("/getAvailableNetworks", (req, res) => {
    const networks = [{"ssid":"Network-1","rssi":-68},{"ssid":"Network-2","rssi":-88},{"ssid":"Network-3","rssi":-93}];
    res.send(networks);
})

app.get("/test", (req, res) => {
    setTimeout(() => {
        res.send("this is the response");
    }, 5000);
})

app.listen(80, ()=>{
    console.log("listening!");
})