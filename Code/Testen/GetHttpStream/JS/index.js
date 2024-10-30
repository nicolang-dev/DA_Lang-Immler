const http = require("http");
const fs = require("fs");

let counter = 0;
let logged = false;

let data;
let arr = new Uint16Array();

function decimalToBinary(decimal){
    return decimal.toString(2);
}

http.get("http://st01.dlf.de/dlf/01/128/mp3/stream.mp3", (resp) => {
   const url = resp.headers.location;
    http.get(url, (resp)=>{
        resp.on("data", (chunk)=>{
            console.log(chunk);
            if(!logged){
                for(let data of chunk){
                    if(data == 0xFF){
                        counter ++;
                    }
                }
                logged = true;
                console.log(chunk.length);
                console.log(counter);
            }
        })
    })
})