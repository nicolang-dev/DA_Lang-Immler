const express = require("express");

const app = express();

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

app.get("/getMac", (req, res) => {
    const exampleMac = "30:AE:A4:07:0D:64";
    res.send(exampleMac);
})

app.get("/getName",  (req, res) => {
    const exampleName = "MSA_0D64";
    res.send(exampleName);
})

app.listen(80, ()=>{
    console.log("listening!");
})