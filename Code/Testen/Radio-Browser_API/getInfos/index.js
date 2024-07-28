const https = require("https");
const dns = require('dns');
const util = require('util');
const resolveSrv = util.promisify(dns.resolveSrv);
const axios = require("axios");
const { performance } = require("perf_hooks");

async function getServerUrls() {
    const hosts = await resolveSrv("_api._tcp.radio-browser.info");
    hosts.sort();
    return hosts.map(host => "https://" + host.name);
}

async function getBestServerUrl(serverUrls) {
    let bestServerUrl;
    let lowestServerTime = Number.MAX_VALUE;

    for (let serverUrl of serverUrls) {
        try {
            const start = performance.now();
            await axios.get(serverUrl);
            const end = performance.now();
            const serverTime = end - start;
            if (serverTime < lowestServerTime) {
                lowestServerTime = serverTime;
                bestServerUrl = serverUrl;
            }
        } catch (error) {
            console.error(`Error reaching ${serverUrl}:`, error);
        }
    }
    return bestServerUrl;
}

async function getStations(serverUrl, filters) {
    const postData = JSON.stringify({filters});

    const options = {
        hostname: serverUrl.replace('https://', ''),
        path: "/json/stations/search",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": postData.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                try {
                    const dataJson = JSON.parse(data);
                    const stations = Array();
                    for(const station of dataJson){
                        stations.push({
                            name: station.name,
                            url: station.url
                        });
                    }
                    resolve(stations);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on("error", (e) => {
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

(async () => {
    try {
        const serverUrls = await getServerUrls();
        const bestServerUrl = await getBestServerUrl(serverUrls);
        if (bestServerUrl) {
            const stations = await getStations(bestServerUrl);
            console.log(stations);
        } else {
            console.log('No reachable server found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();