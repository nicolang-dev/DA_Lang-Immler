import axios from "axios";
import Network from "../types/Network";
import AdapterData from "@/types/AdapterData";
import Adapter from "@/types/Adapter";

export const AdapterAPI = {
    /**
     * get information of adapter
     * @param {string} adapterName - name of adapter
     * @returns {Promise<InfoType>} - Promise, with Data as InfoType (name: string, mac: string, volume: number, battery: number, stationUrl: string)
     */ 
    getUrlFromMac(mac: string): string{
        let withoutSeperator = mac.replace(":", "");
        let uniquePart = withoutSeperator.substring(6, withoutSeperator.length-1);
        let url = "http://msa_" + uniquePart + ".local:8080";
        return url;
    },
    async getInfo(adapter: Adapter): Promise<AdapterData>{
        const url = this.getUrlFromMac(adapter.mac) + "/getInfo";
        try{
            const res = await axios.get(url, {timeout: 2500});
            return {adapter: adapter, volume: res.data.volume, battery: res.data.battery, streamUrl: res.data.stationUrl};
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
    async getAvailableNetworks(adapter: Adapter): Promise<Network[]>{
        const url = this.getUrlFromMac(adapter.mac) + "/getAvailableNetworks";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data);
        } catch(err) {
            throw err;
        }
    },
    async getPaused(adapter: Adapter): Promise<boolean>{
        const url = this.getUrlFromMac(adapter.mac) + "/getPaused";
        try{
            const res = await axios.get(url);
            return JSON.parse(res.data).paused;
        } catch(err) {
            throw err;
        }
    },
    async sendConfigData(adapter: Adapter, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = this.getUrlFromMac(adapter.mac) + "/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        return axios.post(url, data);
    },
    async sendVolume(adapter: Adapter, volume: number){
        const url = this.getUrlFromMac(adapter.mac) + "/setVolume";
        const data = "volume=" + volume;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendStreamUrl(adapter: Adapter, streamUrl: string){
        const url = this.getUrlFromMac(adapter.mac) + "/setStreamUrl";
        const data = "url=" + streamUrl;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendPauseStream(adapter: Adapter){
        const url = this.getUrlFromMac(adapter.mac) + "/pauseStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    },
    async sendContinueStream(adapter: Adapter){
        const url = this.getUrlFromMac(adapter.mac) + "/continueStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    }
}