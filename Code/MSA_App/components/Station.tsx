class Station{
    private name: string;
    private iconUrl: string;
    private url: string;

    public constructor(name: string, iconUrl: string, url: string){
        this.name = name;
        this.iconUrl = iconUrl;
        this.url = url;
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