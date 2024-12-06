import Station from "./Station";

class Adapter{
    name: string;
    mac: string;
    ip: string;

    constructor(name: string, mac: string, ip: string){
        this.name = name;
        this.mac = mac;
        this.ip = ip;
    }
}

export default Adapter;