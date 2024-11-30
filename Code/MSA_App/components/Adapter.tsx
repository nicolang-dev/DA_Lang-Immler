class Adapter{
    private name: string;
    private mac: string;

    public constructor(name: string, mac: string){
        this.name = name;
        this.mac = mac;
    }
    public getName(){
        return this.name;
    }
    public getMac(){
        return this.mac;
    }
}

export default Adapter;