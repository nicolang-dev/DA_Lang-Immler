class Adapter{
    private id: number;
    private name: string;
    private mac: string;
    private connected: boolean;
    private battery: number;

    public constructor(id: number, name: string, mac: string, connected: boolean, battery: number){
        this.id = id;
        this.name = name;
        this.mac = mac;
        this.connected = connected;
        this.battery = battery;
    }
    public getId(){
        return this.id;
    }
    public getName(){
        return this.name;
    }
    public getMac(){
        return this.mac;
    }
    public isConnected(){
        return this.connected;
    }
    public getBattery(){
        return this.battery;
    }
}

export default Adapter;