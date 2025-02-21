import axios from "axios";
import Network from "../types/Network";
import AdapterData from "@/types/AdapterData";

function getUrlFromMac(mac: string): string{
    let uniquePart = mac.substring(9, 11) + mac.substring(12, 14) + mac.substring(15, 17);
    let url = "http://maa_" + uniquePart + ".local:8080";
    return url;
}

export const AdapterAPI = {
    /**
     * get information of adapter via http get-request
     * @param {string} mac - mac of adapter
     * @returns {Promise<AdapterData>} - Promise, with Data as AdapterData type (name: string, mac: string, volume: number, battery: number, stationUrl: string)
     */ 
    async getInfo(mac: string): Promise<AdapterData>{
        const url = getUrlFromMac(mac) + "/getInfo";
        try{
            const res = await axios.get(url, {timeout: 2500});
            return {name: res.data.name, mac: res.data.mac, volume: res.data.volume, battery: res.data.battery, streamUrl: res.data.stationUrl, connected: true};
        } catch(err) {
            throw err;
        }
    },
    async getInfoFromHost(host: string): Promise<AdapterData>{
        const url = host + "/getInfo";
        try{
            const res = await axios.get(url, {timeout: 2500});
            return {name: res.data.name, mac: res.data.mac, volume: res.data.volume, battery: res.data.battery, streamUrl: res.data.stationUrl, connected: true};
        } catch(err) {
            throw err;
        }
    },
    async getAvailableNetworks(mac: string): Promise<Network[]>{
        const url = getUrlFromMac(mac) + "/getAvailableNetworks";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data);
        } catch(err) {
            throw err;
        }
    },
    async getPaused(mac: string): Promise<boolean>{
        const url = getUrlFromMac(mac) + "/getPaused";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data).paused;
        } catch(err) {
            throw err;
        }
    },
    async sendWifiCredentials(mac: string, wifiSsid: string, wifiPassword: string){
        const url = getUrlFromMac(mac) + "/setWifiCredentials";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword;
        return axios.post(url, data);
    },
    async sendVolume(mac: string, volume: number){
        const url = getUrlFromMac(mac) + "/setVolume";
        const data = "volume=" + volume;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendStreamUrl(mac: string, streamUrl: string){
        const url = getUrlFromMac(mac) + "/setStreamUrl";
        const data = "url=" + streamUrl;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendPauseStream(mac: string){
        const url = getUrlFromMac(mac) + "/pauseStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    },
    async sendContinueStream(mac: string){
        const url = getUrlFromMac(mac) + "/continueStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    }
}