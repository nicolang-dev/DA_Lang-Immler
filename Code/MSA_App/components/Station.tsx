class Station{
    private id: number;
    private name: string;
    private iconUrl: string;
    private url: string;

    public constructor(id: number, name: string, iconUrl: string, url: string){
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.url = url;
    }
    public getId(){
        return this.id;
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