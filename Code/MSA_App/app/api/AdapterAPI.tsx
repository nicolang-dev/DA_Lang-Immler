import axios from "axios";

type InfoType = {
    name: string,
    mac: string,
    volume: number,
    battery: number,
    stationUrl: string
};

export const AdapterAPI = {   
    async getInfo(adapterName: string): Promise<InfoType>{
        const url = "http://" + adapterName + ".local:8080/getInfo";
        try{
            const res = await axios.get(url);
            return res.data;
        } catch(err) {
            throw err;
        }
    },
    async sendConfigData(adapterName: string, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = "http://" + adapterName + ".local:8080/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        return axios.post(url, data);
    },
    async sendVolume(adapterName: String, volume: number){
        const url = "http://" + adapterName + ".local:8080/setVolume";
        const data = "volume=" + volume;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendStreamUrl(adapterName: string, streamUrl: string){
        const url = "http://" + adapterName + ".local:8080/setStreamUrl";
        const data = "url=" + streamUrl;
        try{
            return axios.put(url, data);
        } catch(err){
            throw err;
        }
    },
    async sendPauseStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/pauseStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    },
    async sendContinueStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/continueStream";
        try{
            return axios.post(url);
        } catch(err){
            throw err;
        }
    }
}