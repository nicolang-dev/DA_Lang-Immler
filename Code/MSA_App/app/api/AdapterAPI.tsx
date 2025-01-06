import axios from "axios";

export const AdapterAPI = {   
    async getInfo(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/getInfo";
        axios.get(url).then(res => {
            return res.data;
        })
    },
    async sendConfigData(adapterName: string, wifiSsid: string, wifiPassword: string, newAdapterName: string){
        const url = "http://" + adapterName + ".local:8080/setConfigData";
        const data = "ssid=" + wifiSsid + "&password=" + wifiPassword + "&name=" + newAdapterName;
        return axios.post(url, data);
    },
    async sendVolume(adapterName: String, volume: number){
        const url = "http://" + adapterName + ".local:8080/setVolume";
        const data = "volume=" + volume;
        return axios.put(url, data);
    },
    async sendStreamUrl(adapterName: string, streamUrl: string){
        const url = "http://" + adapterName + ".local:8080/setStreamUrl";
        const data = "url=" + streamUrl;
        console.log("data: ", data);
        return axios.put(url, data);
    },
    async sendPauseStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/pauseStream";
        return axios.post(url);
    },
    async sendContinueStream(adapterName: string){
        const url = "http://" + adapterName + ".local:8080/continueStream";
        return axios.post(url);
    }
}