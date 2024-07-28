const http = require("http");

const options = {
    host: 's5-webradio.antenne.de',
    path: '/antenne'
};

http.request(options, (resp) => {
    resp.on("data", (chunk) => {
        console.log(chunk);
    });

    resp.on("error", (err) => {
        console.error(err);
    });
}).end();
