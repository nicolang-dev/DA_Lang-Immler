class Station{
    private uuid: string;
    private name: string;
    private iconUrl: string;
    private url: string;

    public constructor(uuid: string, name: string, iconUrl: string, url: string){
        this.uuid = uuid;
        this.name = name;
        this.iconUrl = iconUrl;
        this.url = url;
    }
    public getUuid(){
        return this.uuid;
    }
    public getName(){
        return this.name;
    }
    public getIconUrl(){
        return this.iconUrl;
    }
    public getUrl(){
        return this.url;
    }
}

export default Station;