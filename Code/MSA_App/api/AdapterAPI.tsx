import axios from "axios";
import Network from "../types/Network";
import AdapterData from "@/types/AdapterData";

export const AdapterAPI = {
    
    getUrlFromMac(mac: string): string{
        let withoutSeperator = mac.replace(":", "");
        let uniquePart = withoutSeperator.substring(6, withoutSeperator.length-1);
        let url = "http://msa_" + uniquePart + ".local:8080";
        return url;
    },
    /**
     * get information of adapter via http get-request
     * @param {string} mac - mac of adapter
     * @returns {Promise<AdapterData>} - Promise, with Data as AdapterData type (name: string, mac: string, volume: number, battery: number, stationUrl: string)
     */ 
    async getInfo(mac: string): Promise<AdapterData>{
        const url = this.getUrlFromMac(mac) + "/getInfo";
        try{
            const res = await axios.get(url, {timeout: 2500});
            return {name: res.data.name, mac: mac, volume: res.data.volume, battery: res.data.battery, streamUrl: res.data.stationUrl, connected: true};
        } catch(err) {
            throw err;
        }
    },
    async getInfoFromHost(hostName: string): Promise<AdapterData>{
        const url = hostName + "/getInfo";
        try{
            const res = await axios.get(url, {timeout: 2500});
            return JSON.parse(res.data);
        } catch(err) {
            throw err;
        }
    },
    async getAvailableNetworks(mac: string): Promise<Network[]>{
        const url = this.getUrlFromMac(mac) + "/getAvailableNetworks";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data);
        } catch(err) {
            throw err;
        }
    },
    async getPaused(mac: string): Promise<boolean>{
        const url = this.getUrlFromMac(mac) + "/getPaused";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data).paused;
        } catch(err) {
            throw err;
        }
    },
    async sendConfigData(mac: string, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = this.getUrlFromMac(mac) + "/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        return axios.post(url, data);
    },
    async sendVolume(mac: string, volume: number){
        const url = this.getUrlFromMac(mac) + "/setVolume";
        const data = "volume=" + volume;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendStreamUrl(mac: string, streamUrl: string){
        const url = this.getUrlFromMac(mac) + "/setStreamUrl";
        const data = "url=" + streamUrl;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendPauseStream(mac: string){
        const url = this.getUrlFromMac(mac) + "/pauseStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    },
    async sendContinueStream(mac: string){
        const url = this.getUrlFromMac(mac) + "/continueStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    }
}