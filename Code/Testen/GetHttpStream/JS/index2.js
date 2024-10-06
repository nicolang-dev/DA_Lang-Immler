const http = require("http");
import { MPEGDecoder } from "mpg123-decoder";

const decoder = new MPEGDecoder();

let url = "http://st01.dlf.de/dlf/01/128/mp3/stream.mp3";

http.get(url, (resp) => {
    url = resp.headers.location;
    http.get(url, (resp) => {
        resp.on("data", (chunk) => {
            console.log(chunk);
            decoder.ready.then(()=>{
                let decoded = decoder.decode(chunk);
                console.log(decoded);
            })
        })
    })
})