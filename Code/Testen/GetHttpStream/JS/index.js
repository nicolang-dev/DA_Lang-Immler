const http = require("http");

http.get("http://s6-webradio.antenne.de/antenne", (resp) => {
    resp.on("data", (data)=>{
        console.log(data.readUInt8(0));
    })
})