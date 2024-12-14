import Station from "./Station";

class Adapter{
    name: string;
    mac: string;
    volume: number;
    battery: number;
    connected: boolean;
    streamUrl: string;

    constructor(name: string, mac: string, volume: number, battery: number, connected: boolean, streamUrl: string){
        this.name = name;
        this.mac = mac;
        this.volume = volume;
        this.battery = battery;
        this.connected = connected;
        this.streamUrl = streamUrl;
    }
}

export default Adapter;